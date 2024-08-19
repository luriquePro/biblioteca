import moment from "moment";
import { formatarBuscaParaMongo } from "./formatarBuscaParaMongo";

describe("formatarBuscaParaMongo", () => {
  it("Deve-se retornar um objeto vazio quando a busca for undefined", () => {
    const result = formatarBuscaParaMongo(undefined);
    expect(result).toEqual({});
  });

  it("Deve-se retornar um objeto vazio quando a busca for um objeto vazio", () => {
    const result = formatarBuscaParaMongo({});
    expect(result).toEqual({});
  });

  it("Deve-se tratar corretamente quando a busca for um objeto vazio com todos os valores nulos ou undefined", () => {
    const validDTO = {
      nome: null,
      cpf: undefined,
      data: null
    };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({});
  });

  it("Deve-se retornar um regex de string quando informada uma string", () => {
    const validDTO = { nome: "João" };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ nome: new RegExp("João", "i") });
  });

  it("Deve-se retornar um numero exato quando informado um numero", () => {
    const validDTO = { idade: 21 };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ idade: 21 });
  });

  it("Deve-se retornar uma data quando informada uma data", () => {
    const validDTO = { nascimento: JSON.stringify({ typeValue: "date", value: "2004-06-03T03:00:00.000Z" }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ nascimento: moment("2004-06-03T03:00:00.000Z").utc().toDate() });
  });

  it("Deve-se retornar um booleano quando informado um boolean", () => {
    const validDTO = { ativo: false };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ ativo: false });
  });

  // it("Deve-se retornar um objeto com os valores formatados corretamente", () => {
  //   const searchQuery = {
  //     nome: "João",
  //     idade: JSON.stringify({ typeValue: "number", value: { $gte: 18, $lte: 65 } }),
  //     data_nascimento: JSON.stringify({ typeValue: "date", value: "2000-01-01T03:00:00.000Z" }),
  //     ativo: JSON.stringify({ typeValue: "exists", value: "false" }),
  //     valido: true,
  //     testado: JSON.stringify({ typeValue: "boolean", value: "true" })
  //   };
  //   const result = formatarBuscaParaMongo(searchQuery);
  //   expect(result).toEqual({
  //     nome: new RegExp("João", "i"),
  //     idade: { $gte: 18, $lte: 65 },
  //     data_nascimento: moment("2000-01-01T03:00:00.000Z").utc().toDate(),
  //     ativo: { $exists: false },
  //     valido: true,
  //     testado: true
  //   });
  // });
});
