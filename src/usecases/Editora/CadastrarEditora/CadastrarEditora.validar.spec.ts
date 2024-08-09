import { CadastrarEditoraValidar } from "./CadastrarEditora.validar";

describe("CadastrarEditoraValidar", () => {
  test("Deve-se retornar um erro caso o nome da editora seja vazio", async () => {
    await expect(CadastrarEditoraValidar({ editora: "" })).rejects.toThrow("Editora é obrigatorio");
  });

  test("Deve-se retornar um erro caso o nome da editora tenha menos de 3 caracteres", async () => {
    await expect(CadastrarEditoraValidar({ editora: "ed" })).rejects.toThrow("Editora precisa ter pelo menos 3 caracteres");
  });

  test("Deve-se validar o nome da editora com sucesso", async () => {
    await expect(CadastrarEditoraValidar({ editora: "editora_valida" })).resolves.toBeUndefined();
  });
});
