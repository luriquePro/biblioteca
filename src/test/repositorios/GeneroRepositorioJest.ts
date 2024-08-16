import { IGeneroRepositorio } from "../../usecases/Genero/Genero.interfaces";

export const GeneroRepositorioJest: IGeneroRepositorio = {
  cadastrar: jest.fn(),
  buscarGenero: jest.fn().mockResolvedValue(null),
  listarGeneros: jest.fn().mockReturnValue([]),
  buscarGeneros: jest.fn().mockReturnValue([])
};
