import { AutorRepositorioJest } from "../../../test/repositorios/AutorRepositorioJest";
import { IAutorDTO } from "../../../types/Autor.types";
import { ListarAutoresUseCase } from "./ListarAutores.usecase";

describe("ListarAutoresUseCase", () => {
  test("Deve-se listar os Autores cadastrados", async () => {
    const listaAutores: IAutorDTO[] = [
      { id: "1", autor: "autor1" },
      { id: "2", autor: "autor2" },
      { id: "3", autor: "autor3" }
    ];

    (AutorRepositorioJest.listarAutores as jest.Mock).mockResolvedValue(listaAutores);

    const sut = new ListarAutoresUseCase(AutorRepositorioJest);
    const output = await sut.handle();

    expect(output).toStrictEqual(listaAutores);
    expect(AutorRepositorioJest.listarAutores).toHaveBeenCalledTimes(1);
  });
});
