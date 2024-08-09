import { ISBNValidator } from "./ISBNValidator";

describe("ISBNValidator", () => {
  test("Deve-se retornar true para um ISBN10 válido", () => {
    expect(ISBNValidator("0-306-40615-2")).toBe(true);
  });

  test("Deve-se retornar false para um ISBN10 inválido", () => {
    expect(ISBNValidator("0-306-40615-3")).toBe(false);
  });

  test("Deve-se retornar true para um ISBN13 válido", () => {
    expect(ISBNValidator("978-3-16-148410-0")).toBe(true);
  });

  test("Deve-se retornar false para um ISBN13 inválido", () => {
    expect(ISBNValidator("978-3-16-148410-1")).toBe(false);
  });

  test("Deve-se retornar false para um ISBN com mais de 13 dígitos", () => {
    expect(ISBNValidator("12345678901234")).toBe(false);
  });

  test("Deve-se retornar false para um ISBN com menos de 10 dígitos", () => {
    expect(ISBNValidator("123456789")).toBe(false);
  });

  test("Deve-se retornar false para um ISBN com letras", () => {
    expect(ISBNValidator("1234-56789-a")).toBe(false);
  });
});
