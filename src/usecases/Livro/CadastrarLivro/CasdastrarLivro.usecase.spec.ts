import { IAutorRepositorio } from "../../Autor/Autor.interfaces";
import { IEditoraRepositorio } from "../../Editora/Editora.interfaces";
import { IGeneroRepositorio } from "../../Genero/Genero.interfaces";
import { ILivroRepositorio } from "../Livro.interfaces";
import { ICadastrarLivroRawDTO } from "./CasdastrarLivro.interfaces";
import { CadastrarLivroUseCase } from "./CasdastrarLivro.usecase";

describe("CadastrarLivroUseCase", () => {
  const LivroRepositorio: ILivroRepositorio = {
    cadastrar: jest.fn(),
    buscarLivro: jest.fn().mockResolvedValue(null),
    buscarLivros: jest.fn().mockReturnValue([]),
    listarLivrosComPaginacao: jest.fn().mockReturnValue([])
  };

  const AutorRepositorio: IAutorRepositorio = {
    cadastrar: jest.fn(),
    buscarAutor: jest.fn().mockResolvedValue(null),
    listarAutores: jest.fn().mockReturnValue([]),
    buscarAutores: jest.fn().mockReturnValue([])
  };

  const EditoraRepositorio: IEditoraRepositorio = {
    cadastrar: jest.fn(),
    buscarEditora: jest.fn().mockResolvedValue(null),
    listarEditoras: jest.fn().mockReturnValue([])
  };

  const GeneroRepositorio: IGeneroRepositorio = {
    cadastrar: jest.fn(),
    buscarGenero: jest.fn().mockResolvedValue(null),
    listarGeneros: jest.fn().mockReturnValue([]),
    buscarGeneros: jest.fn().mockReturnValue([])
  };

  let validDTO: ICadastrarLivroRawDTO;

  beforeEach(() => {
    validDTO = {
      titulo: "Livro Exemplo",
      autores_ids: ["1"],
      generos_ids: ["1"],
      editora_id: "1",
      edicao: 1,
      ISBN: "9783161484100",
      quantidade: 5,
      data_lancamento: new Date("2025-01-01"),
      descricao: "Um livro interessante",
      valor_de_compra: 10.0,
      valor_de_venda: 20.0
    };
  });

  test("Deve-se dar um erro ao não informar autores corretos", async () => {
    (AutorRepositorio.listarAutores as jest.Mock).mockResolvedValue([]);

    const sut = new CadastrarLivroUseCase(LivroRepositorio, AutorRepositorio, GeneroRepositorio, EditoraRepositorio);
    await expect(async () => await sut.handle({ ...validDTO })).rejects.toThrow("Autores Invalidos");
    expect(LivroRepositorio.cadastrar).toHaveBeenCalledTimes(0);
  });
});
