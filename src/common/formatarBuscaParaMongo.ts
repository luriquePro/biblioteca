import moment from "moment";
import { Query } from "../types/Paginacao";

export const formatarBuscaParaMongo = (searchQuery?: Query): Record<string, any> | undefined => {
  if (!searchQuery) return undefined;

  const resultQuery: Record<string, any> = {};

  for (const [column, value] of Object.entries(searchQuery)) {
    try {
      const queryObject = JSON.parse(value);
      const { typeValue, value: queryValue } = queryObject;

      switch (typeValue) {
        case "date":
          resultQuery[column] = formatarBuscaComData(queryValue);
          break;
        case "number":
          resultQuery[column] = formatarBuscaComNumero(queryValue);
          break;
        case "exists":
          resultQuery[column] = { $exists: queryValue === "true" };
          break;
        default:
          resultQuery[column] = formatDefaultQuery(column, queryValue, value);
          break;
      }
    } catch {
      resultQuery[column] = new RegExp(value, "i");
    }
  }

  return resultQuery;
};

const formatarBuscaComData = (queryValue: any): Record<string, any> => {
  if (typeof queryValue === "object") {
    const dateObject: Record<string, Date> = {};
    if (queryValue.$gte) dateObject["$gte"] = moment(queryValue.$gte).toDate();
    if (queryValue.$lte) dateObject["$lte"] = moment(queryValue.$lte).toDate();
    return dateObject;
  }
  return moment(queryValue).toDate();
};

const formatarBuscaComNumero = (queryValue: any): Record<string, number> => {
  const numberObject: Record<string, number> = {};
  if (queryValue.$gte !== undefined) numberObject["$gte"] = Number(queryValue.$gte);
  if (queryValue.$lte !== undefined) numberObject["$lte"] = Number(queryValue.$lte);
  return numberObject;
};

const formatDefaultQuery = (column: string, queryValue: any, rawValue: any) => {
  if (column === "cpf" || column === "cep") {
    return new RegExp(rawValue, "i");
  }
  return isNaN(rawValue) ? queryValue : parseInt(rawValue, 10);
};
