import { formatarBuscaParaMongo } from "./common/formatarBuscaParaMongo";

const validDTO = {
  // nome: "teste",
  // cpf: "71079969403",
  // order: 5,
  // classificacao: "asc",
  valor_teste: 1,
  data_teste: JSON.stringify({ typeValue: "date", value: "2024-01-01" }),
  data_criacao: JSON.stringify({ typeValue: "date", value: { $gte: "2024-01-01", $lte: "2024-12-31" } }),
  order: JSON.stringify({ typeValue: "number", value: { $gte: 1, $lte: 0 } }),
  oldSchool: JSON.stringify({ typeValue: "exists", value: "true" }),
  cpf: "71079969403"
};

const result01 = formatarBuscaParaMongo(validDTO);

console.log(result01);
