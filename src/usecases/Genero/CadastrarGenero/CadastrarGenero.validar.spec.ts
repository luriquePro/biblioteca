import { CadastrarGeneroValidar } from "./CadastrarGenero.validar";

describe("CadastrarGeneroValidar", () => {
  test("Deve-se retornar um erro caso o gênero seja vazio", async () => {
    await expect(CadastrarGeneroValidar({ genero: "" })).rejects.toThrow("Gênero é obrigatorio");
  });

  test("Deve-se retornar um erro caso o gênero tenha menos de 3 caracteres", async () => {
    await expect(CadastrarGeneroValidar({ genero: "ga" })).rejects.toThrow("Gênero precisa ter pelo menos 3 caracteres");
  });

  test("Deve-se validar os dados com sucesso", async () => {
    await expect(CadastrarGeneroValidar({ genero: "gênero" })).resolves.toBeUndefined();
  });
});
