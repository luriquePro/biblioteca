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
      valor_de_venda: 20.0
    };
  });

  test("Deve-se dar um erro ao não informar autores corretos", async () => {
    (AutorRepositorioJest.listarAutores as jest.Mock).mockResolvedValue([]);

    const sut = new CadastrarLivroUseCase(LivroRepositorioJest, AutorRepositorioJest, GeneroRepositorioJest, EditoraRepositorioJest);
    await expect(async () => await sut.handle({ ...validDTO })).rejects.toThrow("Autores Invalidos");
    expect(LivroRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });
});
