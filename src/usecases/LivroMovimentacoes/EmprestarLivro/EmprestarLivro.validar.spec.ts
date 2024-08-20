import { GerarId } from "../../../common/GerarId";
import { IEmprestarLivroRawDTO } from "./EmprestarLivro.interface";
import { EmprestarLivroValidar } from "./EmprestarLivro.validar";

describe("EmprestarLivroValidar", () => {
  let validDTO: IEmprestarLivroRawDTO;

  beforeEach(() => {
    validDTO = {
      id_livro: GerarId(),
      id_usuario: GerarId(),
      periodo_dias: 5
    };
  });

  test("Deve-se validar um DTO válido", async () => {
    await expect(EmprestarLivroValidar(validDTO)).resolves.not.toThrow();
  });

  test("Deve falhar se o id_livro não for informado", async () => {
    validDTO.id_livro = undefined!;
    await expect(EmprestarLivroValidar(validDTO)).rejects.toThrow("Livro é um campo obrigatorio");
  });

  test("Deve falhar se o id_usuario não for informado", async () => {
    validDTO.id_usuario = undefined!;
    await expect(EmprestarLivroValidar(validDTO)).rejects.toThrow("Usuario é um campo obrigatorio");
  });

  test("Deve falhar se o periodo_dias não for informado", async () => {
    validDTO.periodo_dias = undefined!;
    await expect(EmprestarLivroValidar(validDTO)).rejects.toThrow("Periodo de dias é um campo obrigatorio");
  });

  test("Deve falhar se o id_livro não for valido", async () => {
    validDTO.id_livro = "123123asd";
    await expect(EmprestarLivroValidar(validDTO)).rejects.toThrow("Livro deve ser um UUID valido");
  });

  test("Deve falhar se o id_usuario não for valido", async () => {
    validDTO.id_usuario = "123123asd";
    await expect(EmprestarLivroValidar(validDTO)).rejects.toThrow("Usuario deve ser um UUID valido");
  });

  test("Deve falhar se periodos de dias for menor que 1", () => {
    validDTO.periodo_dias = 0;
    expect(EmprestarLivroValidar(validDTO)).rejects.toThrow("Periodo de dias deve ser maior que 0");
  });
});
