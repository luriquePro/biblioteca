import moment from "moment";
import { Query } from "../types/Paginacao";

export const formatarBuscaParaMongo = (searchQuery?: Query): Record<string, any> | undefined => {
  if (!searchQuery) return {};

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
        case "boolean":
          resultQuery[column] = formatarBuscaComBooleano(queryValue);
          break;
        case "exists":
          resultQuery[column] = { $exists: queryValue === "true" };
          break;
        default:
          resultQuery[column] = formatDefaultQuery(column, queryValue, value);
          break;
      }
    } catch {
      if (value !== undefined && value !== null) {
        resultQuery[column] = new RegExp(value, "i");
      }
    }
  }

  return resultQuery;
};

const formatarBuscaComData = (queryValue: any): Record<string, any> => {
  if (typeof queryValue === "object") {
    const dateObject: Record<string, Date> = {};
    if (queryValue.$gte !== undefined && queryValue.$gte !== null) {
      dateObject["$gte"] = moment(queryValue.$gte).utc().toDate();
    }

    if (queryValue.$lte !== undefined && queryValue.$lte !== null) {
      dateObject["$lte"] = moment(queryValue.$lte).utc().toDate();
    }

    return dateObject;
  }
  return moment(queryValue).utc().toDate();
};

const formatarBuscaComNumero = (queryValue: any): Record<string, number> => {
  const numberObject: Record<string, number> = {};
  if (queryValue.$gte !== undefined && queryValue.$gte !== null) {
    numberObject["$gte"] = Number(queryValue.$gte);
  }

  if (queryValue.$lte !== undefined && queryValue.$lte !== null) {
    numberObject["$lte"] = Number(queryValue.$lte);
  }
  return numberObject;
};

const formatarBuscaComBooleano = (queryValue: any) => {
  return queryValue === "true";
};

const formatDefaultQuery = (column: string, queryValue: any, rawValue: any) => {
  if (column === "cpf" || column === "cep") {
    return new RegExp(rawValue, "i");
  }

  if (typeof rawValue) {
    return rawValue;
  }

  return isNaN(rawValue) ? queryValue : parseInt(rawValue, 10);
};
