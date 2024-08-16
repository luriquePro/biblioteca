import { GerarId } from "../../../common/GerarId";
import { GeneroRepositorioJest } from "../../../test/repositorios/GeneroRepositorioJest";
import { CadastrarGeneroUseCase } from "./CadastrarGenero.usecase";

describe("CadastrarGeneroUseCase", () => {
  test("Deve-se cadastrar um novo gênero", async () => {
    const sut = new CadastrarGeneroUseCase(GeneroRepositorioJest);
    const output = await sut.handle({ genero: "gênero_valido" });

    expect(output).toBeUndefined();

    expect(GeneroRepositorioJest.cadastrar).toHaveBeenCalledTimes(1);
    expect(GeneroRepositorioJest.cadastrar).toHaveReturnedWith(undefined);

    expect(GeneroRepositorioJest.buscarGenero).toHaveBeenCalledTimes(1);
  });

  test("Deve-se retornar erro se o gênero já está cadastrado", async () => {
    const cadastrarGeneroDTO = { genero: "genero_existente" };
    const generoDTO = { ...cadastrarGeneroDTO, id: GerarId() };

    (GeneroRepositorioJest.buscarGenero as jest.Mock).mockResolvedValue(generoDTO);

    const sut = new CadastrarGeneroUseCase(GeneroRepositorioJest);
    await expect(sut.handle(cadastrarGeneroDTO)).rejects.toThrow("Genero já cadastrado");
    expect(GeneroRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });
});
