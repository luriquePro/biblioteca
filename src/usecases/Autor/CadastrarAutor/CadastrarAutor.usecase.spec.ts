import { GerarId } from "../../../common/GerarId";
import { AutorRepositorioJest } from "../../../test/repositorios/AutorRepositorioJest";
import { ICadastrarAutorDTO } from "./CadastrarAutor.interfaces";
import { CadastrarAutorUseCase } from "./CadastrarAutor.usecase";

describe("CadastrarAutorUseCase", () => {
  test("Deve-se cadastrar um novo autor", async () => {
    const sut = new CadastrarAutorUseCase(AutorRepositorioJest);
    const output = await sut.handle({ autor: "autor_valido" });

    expect(output).toBeUndefined();

    expect(AutorRepositorioJest.cadastrar).toHaveBeenCalledTimes(1);
    expect(AutorRepositorioJest.cadastrar).toHaveReturnedWith(undefined);

    expect(AutorRepositorioJest.buscarAutor).toHaveBeenCalledTimes(1);
  });

  test("Deve-se retornar erro se o autor já está cadastrado", async () => {
    const cadastrarAutorDTO: ICadastrarAutorDTO = { autor: "autor_existente" };
    const AutorDTO = { ...cadastrarAutorDTO, id: GerarId() };

    (AutorRepositorioJest.buscarAutor as jest.Mock).mockResolvedValue(AutorDTO);

    const sut = new CadastrarAutorUseCase(AutorRepositorioJest);
    await expect(sut.handle(cadastrarAutorDTO)).rejects.toThrow("Autor já cadastrado");
    expect(AutorRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });
});
