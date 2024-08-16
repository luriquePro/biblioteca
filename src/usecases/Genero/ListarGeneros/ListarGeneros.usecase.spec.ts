import { GeneroRepositorioJest } from "../../../test/repositorios/GeneroRepositorioJest";
import { IGeneroDTO } from "../../../types/Genero.types";
import { ListarGenerosUseCase } from "./ListarGeneros.usecase";

describe("ListarGenerosUseCase", () => {
  test("Deve-se listar os gêneros cadastrados", async () => {
    const listaGeneros: IGeneroDTO[] = [
      { id: "1", genero: "genero1" },
      { id: "2", genero: "genero2" },
      { id: "3", genero: "genero3" }
    ];

    (GeneroRepositorioJest.listarGeneros as jest.Mock).mockResolvedValue(listaGeneros);

    const sut = new ListarGenerosUseCase(GeneroRepositorioJest);
    const output = await sut.handle();

    expect(output).toStrictEqual(listaGeneros);
    expect(GeneroRepositorioJest.listarGeneros).toHaveBeenCalledTimes(1);
  });
});
