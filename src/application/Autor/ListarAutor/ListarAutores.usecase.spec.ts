import { IAutorDTO } from "../../../types/Autor.types";
import { IAutorRepositorio } from "../Autor.interfaces";
import { ListarAutoresUseCase } from "./ListarAutores.usecase";

describe("ListarAutoresUseCase", () => {
  const AutorRepositorio: IAutorRepositorio = {
    cadastrar: jest.fn(),
    buscarAutor: jest.fn(),
    listarAutores: jest.fn().mockResolvedValue(null)
  };

  test("Deve-se listar os Autores cadastrados", async () => {
    const listaAutores: IAutorDTO[] = [
      { id: "1", autor: "autor1" },
      { id: "2", autor: "autor2" },
      { id: "3", autor: "autor3" }
    ];

    (AutorRepositorio.listarAutores as jest.Mock).mockResolvedValue(listaAutores);

    const sut = new ListarAutoresUseCase(AutorRepositorio);
    const output = await sut.handle();

    expect(output).toStrictEqual(listaAutores);
    expect(AutorRepositorio.listarAutores).toHaveBeenCalledTimes(1);
  });
});
