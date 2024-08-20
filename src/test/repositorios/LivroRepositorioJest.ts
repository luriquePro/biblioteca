import { ILivroRepositorio } from "../../usecases/Livro/Livro.interfaces";

export const LivroRepositorioJest: ILivroRepositorio = {
  cadastrar: jest.fn(),
  buscarLivro: jest.fn().mockResolvedValue(null),
  buscarLivros: jest.fn().mockReturnValue([]),

  listarLivrosComPaginacao: jest.fn().mockReturnValue([]),
  quantidadeLivros: jest.fn().mockReturnValue(0),
  sumarioGeralDeListarLivros: jest.fn().mockReturnValue({})
};
