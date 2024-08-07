import { GerarId } from "./GerarId";

describe("Gerador de Id", () => {
  test("Deve-se gerar um id", () => expect(GerarId()).not.toBeNull());
});
