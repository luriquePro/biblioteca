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

  it("Deve-se retornar um booleano quando informado um boolean como uma string", () => {
    const validDTO = { ativo: "false" };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ ativo: false });
  });

  it("Deve-se retornar um booleano quando informado um boolean como um object", () => {
    const validDTO = { ativo: JSON.stringify({ typeValue: "boolean", value: "true" }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ ativo: true });
  });

  it("Deve-se retornar um booleano quando informado um boolean como um object", () => {
    const validDTO = { ativo: JSON.stringify({ typeValue: "boolean", value: true }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ ativo: true });
  });

  it("Deve-se retornar um intervalo de Numeros", () => {
    const validDTO = { idade: JSON.stringify({ typeValue: "number", value: { $gte: 18, $lte: 65 } }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ idade: { $gte: 18, $lte: 65 } });
  });

  it("Deve-se retornar um intervalo de datas", () => {
    const validDTO = {
      nascimento: JSON.stringify({ typeValue: "date", value: { $gte: "2000-01-01T03:00:00.000Z", $lte: "2004-06-03T03:00:00.000Z" } })
    };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({
      nascimento: { $gte: moment("2000-01-01T03:00:00.000Z").utc().toDate(), $lte: moment("2004-06-03T03:00:00.000Z").utc().toDate() }
    });
  });

  it("Deve-se retornar um $exists quando informado um boolean exists como um object", () => {
    const validDTO = { usuarioAntigo: JSON.stringify({ typeValue: "exists", value: "true" }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ usuarioAntigo: { $exists: true } });
  });

  it("Deve-se retornar um $exists quando informado um boolean exists como um object", () => {
    const validDTO = { usuarioAntigo: JSON.stringify({ typeValue: "exists", value: false }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ usuarioAntigo: { $exists: false } });
  });

  it("Deve-se retornar um $ne boolean quando informado um valor $ne booleano", () => {
    const validDTO = { usuarioAntigo: JSON.stringify({ typeValue: "not-equals", value: "true" }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ usuarioAntigo: { $ne: true } });
  });

  it("Deve-se retornar um $ne boolean quando informado um valor $ne booleano", () => {
    const validDTO = { usuarioAntigo: JSON.stringify({ typeValue: "not-equals", value: true }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ usuarioAntigo: { $ne: true } });
  });

  it("Deve-se retornar um $ne string quando informado um valor $ne string", () => {
    const validDTO = { nome: JSON.stringify({ typeValue: "not-equals", value: "teste" }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ nome: { $ne: "teste" } });
  });

  it("Deve-se retornar um $ne number quando informado um valor $ne number", () => {
    const validDTO = { valor: JSON.stringify({ typeValue: "not-equals", value: 5 }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ valor: { $ne: 5 } });
  });

  it("Deve-se retornar um $ne date quando informado um valor $ne date", () => {
    const validDTO = { valor: JSON.stringify({ typeValue: "not-equals", value: "2024-06-03T03:00:00.000Z" }) };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ valor: { $ne: moment("2024-06-03T03:00:00.000Z").toISOString() } });
  });

  it("Deve-se retornar um regex quando informado cpf", () => {
    const validDTO = { cpf: 710799694 };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ cpf: new RegExp(String(710799694), "i") });
  });

  it("Deve-se retornar um regex quando informado nome", () => {
    const validDTO = { nome: "teste" };

    const output = formatarBuscaParaMongo(validDTO);
    expect(output).toEqual({ nome: new RegExp("teste", "i") });
  });
});
