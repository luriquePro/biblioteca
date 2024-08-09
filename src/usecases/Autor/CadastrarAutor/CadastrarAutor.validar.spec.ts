import { CadastrarAutorValidar } from "./CadastrarAutor.validar";

describe("CadastrarAutorValidar", () => {
  test("Deve-se lançar um erro caso o autor seja inválido", async () => {
    await expect(CadastrarAutorValidar({ autor: "" })).rejects.toThrow(new Error("Autor é obrigatório"));
  });

  test("Deve-se lançar um erro caso o autor tenha menos de 3 caracteres", async () => {
    await expect(CadastrarAutorValidar({ autor: "au" })).rejects.toThrow(new Error("Autor precisa ter pelo menos 3 caracteres"));
  });

  test("Deve-se validar o autor com sucesso", async () => {
    await expect(CadastrarAutorValidar({ autor: "aut" })).resolves.toBeUndefined();
  });
});
