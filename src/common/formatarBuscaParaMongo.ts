import moment from "moment";
import { IObjetoBusca, Query } from "../types/Paginacao";

export const formatarBuscaParaMongo = (searchQuery?: Query): Record<string, any> | undefined => {
  if (!searchQuery) return {};

  const resultQuery: Record<string, any> = {};

  for (const [column, value] of Object.entries(searchQuery)) {
    try {
      const queryObject = JSON.parse(value) as IObjetoBusca;
      const { typeValue, value: queryValue } = queryObject;

      switch (typeValue) {
        case "date":
          resultQuery[column] = formatarBuscaComData(queryValue);
          break;
        case "number":
          resultQuery[column] = formatarBuscaComNumero(queryValue);
          break;
        case "boolean":
          resultQuery[column] = queryValue === "true" || queryValue === true;
          break;
        case "exists":
          resultQuery[column] = { $exists: queryValue === "true" || queryValue === true };
          break;
        case "not-equals":
          resultQuery[column] = formatarBuscaComNotEquals(queryValue);
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

const formatarBuscaComNotEquals = (queryValue: any) => {
  if (queryValue === "true" || queryValue === "false" || queryValue === true || queryValue === false) {
    return { $ne: queryValue === "true" || queryValue === true };
  }

  return { $ne: queryValue };
};

const formatDefaultQuery = (column: string, queryValue: any, rawValue: any) => {
  if (column === "cpf" || column === "cep") {
    return new RegExp(rawValue, "i");
  } else if (rawValue == "true" || rawValue == "false") {
    return rawValue === "true" || rawValue === true;
  }

  if (typeof rawValue === "boolean") {
    return rawValue;
  }

  return isNaN(rawValue) ? queryValue : parseInt(rawValue, 10);
};
