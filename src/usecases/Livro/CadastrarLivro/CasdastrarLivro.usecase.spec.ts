import { AutorRepositorioJest } from "../../../test/repositorios/AutorRepositorioJest";
import { EditoraRepositorioJest } from "../../../test/repositorios/EditoraRepositorioJest";
import { GeneroRepositorioJest } from "../../../test/repositorios/GeneroRepositorioJest";
import { LivroRepositorioJest } from "../../../test/repositorios/LivroRepositorioJest";
import { ICadastrarLivroRawDTO } from "./CasdastrarLivro.interfaces";
import { CadastrarLivroUseCase } from "./CasdastrarLivro.usecase";

describe("CadastrarLivroUseCase", () => {
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
      valor_de_venda: 20.0,
      valor_emprestimo_diario: 5.0,
      taxa_multa_diaria: 0.02
    };
  });

  test("Deve-se dar um erro ao informar autores incorretos", async () => {
    (AutorRepositorioJest.buscarAutores as jest.Mock).mockResolvedValue([]);

    const sut = new CadastrarLivroUseCase(LivroRepositorioJest, AutorRepositorioJest, GeneroRepositorioJest, EditoraRepositorioJest);
    await expect(async () => await sut.handle({ ...validDTO })).rejects.toThrow("Autores Invalidos");
    expect(AutorRepositorioJest.buscarAutores).toHaveBeenCalledTimes(1);
    expect(GeneroRepositorioJest.buscarGeneros).toHaveBeenCalledTimes(0);
    expect(EditoraRepositorioJest.buscarEditora).toHaveBeenCalledTimes(0);
    expect(LivroRepositorioJest.buscarLivro).toHaveBeenCalledTimes(0);
    expect(LivroRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });

  test("Deve-se dar um erro ao informar generos incorretos", async () => {
    (AutorRepositorioJest.buscarAutores as jest.Mock).mockResolvedValue([{ id: "1", nome: "Autor 1" }]);
    (GeneroRepositorioJest.buscarGeneros as jest.Mock).mockResolvedValue([]);

    const sut = new CadastrarLivroUseCase(LivroRepositorioJest, AutorRepositorioJest, GeneroRepositorioJest, EditoraRepositorioJest);
    await expect(async () => await sut.handle({ ...validDTO })).rejects.toThrow("Gêneros Invalidos");
    expect(AutorRepositorioJest.buscarAutores).toHaveBeenCalledTimes(1);
    expect(GeneroRepositorioJest.buscarGeneros).toHaveBeenCalledTimes(1);
    expect(EditoraRepositorioJest.buscarEditora).toHaveBeenCalledTimes(0);
    expect(LivroRepositorioJest.buscarLivro).toHaveBeenCalledTimes(0);
    expect(LivroRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });

  test("Deve-se dar um erro ao informar editora incorreta", async () => {
    (AutorRepositorioJest.buscarAutores as jest.Mock).mockResolvedValue([{ id: "1", nome: "Autor 1" }]);
    (GeneroRepositorioJest.buscarGeneros as jest.Mock).mockResolvedValue([{ id: "1", nome: "Gênero 1" }]);
    (EditoraRepositorioJest.buscarEditora as jest.Mock).mockResolvedValue(null);

    const sut = new CadastrarLivroUseCase(LivroRepositorioJest, AutorRepositorioJest, GeneroRepositorioJest, EditoraRepositorioJest);
    await expect(async () => await sut.handle({ ...validDTO })).rejects.toThrow("Editora Invalida");
    expect(AutorRepositorioJest.buscarAutores).toHaveBeenCalledTimes(1);
    expect(GeneroRepositorioJest.buscarGeneros).toHaveBeenCalledTimes(1);
    expect(EditoraRepositorioJest.buscarEditora).toHaveBeenCalledTimes(1);
    expect(LivroRepositorioJest.buscarLivro).toHaveBeenCalledTimes(0);
    expect(LivroRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });

  test("Deve-se dar um erro ao informar um ISBN já cadastrado", async () => {
    (AutorRepositorioJest.buscarAutores as jest.Mock).mockResolvedValue([{ id: "1", nome: "Autor 1" }]);
    (GeneroRepositorioJest.buscarGeneros as jest.Mock).mockResolvedValue([{ id: "1", nome: "Gênero 1" }]);
    (EditoraRepositorioJest.buscarEditora as jest.Mock).mockResolvedValue({ id: "1", editora: "Editora 1" });
    (LivroRepositorioJest.buscarLivro as jest.Mock).mockResolvedValue({ ISBN: "9783161484100" });

    const sut = new CadastrarLivroUseCase(LivroRepositorioJest, AutorRepositorioJest, GeneroRepositorioJest, EditoraRepositorioJest);
    await expect(async () => await sut.handle({ ...validDTO })).rejects.toThrow("ISBN Já cadastrado");
    expect(AutorRepositorioJest.buscarAutores).toHaveBeenCalledTimes(1);
    expect(GeneroRepositorioJest.buscarGeneros).toHaveBeenCalledTimes(1);
    expect(EditoraRepositorioJest.buscarEditora).toHaveBeenCalledTimes(1);
    expect(LivroRepositorioJest.buscarLivro).toHaveBeenCalledTimes(1);
    expect(LivroRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });

  test("Deve-se cadastrar um novo Livro", async () => {
    (AutorRepositorioJest.buscarAutores as jest.Mock).mockResolvedValue([{ id: "1", nome: "Autor 1" }]);
    (GeneroRepositorioJest.buscarGeneros as jest.Mock).mockResolvedValue([{ id: "1", nome: "Gênero 1" }]);
    (EditoraRepositorioJest.buscarEditora as jest.Mock).mockResolvedValue({ id: "1", editora: "Editora 1" });
    (LivroRepositorioJest.buscarLivro as jest.Mock).mockResolvedValue(null);
    (LivroRepositorioJest.cadastrar as jest.Mock).mockResolvedValue(null);

    const sut = new CadastrarLivroUseCase(LivroRepositorioJest, AutorRepositorioJest, GeneroRepositorioJest, EditoraRepositorioJest);
    await sut.handle({ ...validDTO });
    expect(AutorRepositorioJest.buscarAutores).toHaveBeenCalledTimes(1);
    expect(GeneroRepositorioJest.buscarGeneros).toHaveBeenCalledTimes(1);
    expect(EditoraRepositorioJest.buscarEditora).toHaveBeenCalledTimes(1);
    expect(LivroRepositorioJest.buscarLivro).toHaveBeenCalledTimes(1);
    expect(LivroRepositorioJest.cadastrar).toHaveBeenCalledTimes(1);
  });
});
