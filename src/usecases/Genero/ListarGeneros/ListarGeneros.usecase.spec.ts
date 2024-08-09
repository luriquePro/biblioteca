import { IGeneroDTO } from "../../../types/Genero.types";
import { IGeneroRepositorio } from "../Genero.interfaces";
import { ListarGenerosUseCase } from "./ListarGeneros.usecase";

describe("ListarGenerosUseCase", () => {
  const GeneroRepositorio: IGeneroRepositorio = {
    cadastrar: jest.fn(),
    buscarGenero: jest.fn(),
    listarGeneros: jest.fn().mockResolvedValue(null)
  };

  test("Deve-se listar os gêneros cadastrados", async () => {
    const listaGeneros: IGeneroDTO[] = [
      { id: "1", genero: "genero1" },
      { id: "2", genero: "genero2" },
      { id: "3", genero: "genero3" }
    ];

    (GeneroRepositorio.listarGeneros as jest.Mock).mockResolvedValue(listaGeneros);

    const sut = new ListarGenerosUseCase(GeneroRepositorio);
    const output = await sut.handle();

    expect(output).toStrictEqual(listaGeneros);
    expect(GeneroRepositorio.listarGeneros).toHaveBeenCalledTimes(1);
  });
});

export { ListarGenerosUseCase };
