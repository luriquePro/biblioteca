import { GerarId } from "../../../common/GerarId";
import { IAutorRepositorio } from "../Autor.interfaces";
import { ICadastrarAutorDTO } from "./CadastrarAutor.interfaces";
import { CadastrarAutorUseCase } from "./CadastrarAutor.usecase";

describe("CadastrarAutorUseCase", () => {
  const AutorRepositorio: IAutorRepositorio = {
    cadastrar: jest.fn(),
    buscarAutor: jest.fn().mockResolvedValue(null),
    listarAutores: jest.fn().mockReturnValue([])
  };

  test("Deve-se cadastrar um novo autor", async () => {
    const sut = new CadastrarAutorUseCase(AutorRepositorio);
    const output = await sut.handle({ autor: "autor_valido" });

    expect(output).toBeUndefined();

    expect(AutorRepositorio.cadastrar).toHaveBeenCalledTimes(1);
    expect(AutorRepositorio.cadastrar).toHaveReturnedWith(undefined);

    expect(AutorRepositorio.buscarAutor).toHaveBeenCalledTimes(1);
  });

  test("Deve-se retornar erro se o autor já está cadastrado", async () => {
    const cadastrarAutorDTO: ICadastrarAutorDTO = { autor: "autor_existente" };
    const AutorDTO = { ...cadastrarAutorDTO, id: GerarId() };

    (AutorRepositorio.buscarAutor as jest.Mock).mockResolvedValue(AutorDTO);

    const sut = new CadastrarAutorUseCase(AutorRepositorio);
    await expect(sut.handle(cadastrarAutorDTO)).rejects.toThrow("Autor já cadastrado");
    expect(AutorRepositorio.cadastrar).toHaveBeenCalledTimes(0);
  });
});
