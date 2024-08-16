import { IAutorRepositorio } from "../../usecases/Autor/Autor.interfaces";

export const AutorRepositorioJest: IAutorRepositorio = {
  cadastrar: jest.fn(),
  buscarAutor: jest.fn().mockResolvedValue(null),
  listarAutores: jest.fn().mockReturnValue([]),
  buscarAutores: jest.fn().mockReturnValue([])
};
