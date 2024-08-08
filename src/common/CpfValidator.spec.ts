import { CpfValidator } from "./CpfValidator";

describe("CpfValidator", () => {
  test("Deve-se retornar true para um cpf válido", () => {
    expect(CpfValidator("71079969403")).toBe(true);
  });

  test("Deve-se retornar false para um cpf inválido", () => {
    expect(CpfValidator("11111111111")).toBe(false);
  });

  test("Deve-se retornar false para um cpf com sequencia de números", () => {
    expect(CpfValidator("00000000000")).toBe(false);
  });

  test("Deve-se retornar false para um cpf com o primeiro dígito inválido", () => {
    expect(CpfValidator("17079969403")).toBe(false);
  });

  test("Deve-se retornar false para um cpf com o segundo dígito inválido", () => {
    expect(CpfValidator("71079969413")).toBe(false);
  });
});
