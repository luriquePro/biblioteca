import { ICadastrarLivroRawDTO } from "./CasdastrarLivro.interfaces";
import { CadastrarLivroValidar } from "./CadastrarLivro.validar";

describe("CadastrarLivroValidar", () => {
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
      valor_emprestimo_diario: 2.0,
      taxa_multa_diaria: 0.01
    };
  });

  test("Deve validar um DTO válido", async () => {
    await expect(CadastrarLivroValidar(validDTO)).resolves.not.toThrow();
  });

  test("Deve falhar se o título não for informado", async () => {
    validDTO.titulo = "";
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Titulo é obrigatorio");
  });

  test("Deve falhar se o título for muito curto", async () => {
    validDTO.titulo = "AB";
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Titulo deve ter pelo menos 3 caracteres");
  });

  test("Deve falhar se autores_ids estiver vazio", async () => {
    validDTO.autores_ids = [];
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Autores devem ser selecionados");
  });

  test("Deve falhar se generos_ids estiver vazio", async () => {
    validDTO.generos_ids = [];
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Gêneros devem ser selecionados");
  });

  test("Deve falhar se editora_id não for informado", async () => {
    validDTO.editora_id = "";
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Editora deve ser selecionada");
  });

  test("Deve falhar se edicao não for um número", async () => {
    validDTO.edicao = NaN;
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow(
      "edicao must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`)."
    );
  });

  test("Deve falhar se o ISBN não for informado", async () => {
    validDTO.ISBN = ""; // ISBN inválido
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("ISBN é obrigatorio");
  });

  test("Deve falhar se o ISBN for inválido", async () => {
    validDTO.ISBN = "1234567890123"; // ISBN inválido
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("ISBN inválido");
  });

  test("Deve falhar se o ISBN for menor que 13 caracteres", async () => {
    validDTO.ISBN = "1234567890"; // ISBN inválido
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("ISBN deve ter pelo menos 13 caracteres");
  });

  test("Deve falhar se o ISBN for maior que 13 caracteres", async () => {
    validDTO.ISBN = "12345678901231231"; // ISBN inválido
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("ISBN deve ter no maximo 13 caracteres");
  });

  test("Deve falhar se a quantidade for menor que 1", async () => {
    validDTO.quantidade = 0;
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Quantidade deve ser maior que 0");
  });

  test("Deve falhar se a descrição for muito curta", async () => {
    validDTO.descricao = "AB";
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Descricão deve ter pelo menos 3 caracteres");
  });

  test("Deve falhar se o valor de compra for menor que 0", async () => {
    validDTO.valor_de_compra = -1;
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Valor de Compra deve ser maior ou igual a zero");
  });

  test("Deve falhar se o valor de venda for menor que 0", async () => {
    validDTO.valor_de_venda = -1;
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Valor de Venda deve ser maior ou igual a zero");
  });

  test("Deve falhar se o valor de emprestimo for menor que 0", async () => {
    validDTO.valor_emprestimo_diario = -1;
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Valor emprestimo deve ser maior ou igual a zero");
  });

  test("Deve falhar se a taxa de multa for menor que 0", async () => {
    validDTO.taxa_multa_diaria = -1;
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Taxa multa deve ser maior ou igual a zero");
  });

  test("Deve falhar se a taxa de multa for 0", async () => {
    validDTO.taxa_multa_diaria = 0;
    await expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Taxa multa deve ser maior ou igual a zero");
  });

  test("Deve falhar se a taxa de multar for maior ou igual a 1", () => {
    validDTO.taxa_multa_diaria = 1.1;
    expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Taxa multa deve ser menor que 1");
  });

  test("Deve falhar se a taxa de multar não for informada", () => {
    validDTO.taxa_multa_diaria = undefined!;
    expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Taxa multa deve ser informada");
  });

  test("Deve falhar se o valor de emprestimo não for informada", () => {
    validDTO.valor_emprestimo_diario = undefined!;
    expect(CadastrarLivroValidar(validDTO)).rejects.toThrow("Valor emprestimo deve ser informado");
  });

  test("Deve permitir valores opcionais de compra e venda", async () => {
    validDTO.valor_de_compra = undefined;
    validDTO.valor_de_venda = undefined;
    await expect(CadastrarLivroValidar(validDTO)).resolves.not.toThrow();
  });
});
