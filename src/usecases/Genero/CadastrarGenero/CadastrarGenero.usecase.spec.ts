import { GerarId } from "../../../common/GerarId";
import { IGeneroRepositorio } from "../Genero.interfaces";
import { CadastrarGeneroUseCase } from "./CadastrarGenero.usecase";

describe("CadastrarGeneroUseCase", () => {
  const GeneroRepositorio: IGeneroRepositorio = {
    cadastrar: jest.fn(),
    buscarGenero: jest.fn().mockResolvedValue(null),
    listarGeneros: jest.fn().mockReturnValue([])
  };

  test("Deve-se cadastrar um novo gênero", async () => {
    const sut = new CadastrarGeneroUseCase(GeneroRepositorio);
    const output = await sut.handle({ genero: "gênero_valido" });

    expect(output).toBeUndefined();

    expect(GeneroRepositorio.cadastrar).toHaveBeenCalledTimes(1);
    expect(GeneroRepositorio.cadastrar).toHaveReturnedWith(undefined);

    expect(GeneroRepositorio.buscarGenero).toHaveBeenCalledTimes(1);
  });

  test("Deve-se retornar erro se o gênero já está cadastrado", async () => {
    const cadastrarGeneroDTO = { genero: "genero_existente" };
    const generoDTO = { ...cadastrarGeneroDTO, id: GerarId() };

    (GeneroRepositorio.buscarGenero as jest.Mock).mockResolvedValue(generoDTO);

    const sut = new CadastrarGeneroUseCase(GeneroRepositorio);
    await expect(sut.handle(cadastrarGeneroDTO)).rejects.toThrow("Genero já cadastrado");
    expect(GeneroRepositorio.cadastrar).toHaveBeenCalledTimes(0);
  });
});
