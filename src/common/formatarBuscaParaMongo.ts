import { Query } from "../types/Paginacao";

export const formatarBuscaParaMongo = (searchQuery?: Query): Record<string, any> | undefined => {
  if (!searchQuery) return undefined;

  const resultQuery: Record<string, any> = {};

  for (const [column, value] of Object.entries(searchQuery)) {
    try {
      const { typeValue, value: searchValue } = JSON.parse(value);

      switch (typeValue) {
        case "date":
          resultQuery[column] = Object.fromEntries(Object.entries(searchValue).map(([key, dateValue]) => [key, new Date(dateValue)]));
          break;
        case "cpf":
          resultQuery[column] = new RegExp(searchValue as string, "i");
          break;
        default:
          resultQuery[column] = isNaN(searchValue) ? searchValue : parseInt(searchValue, 10);
      }
    } catch {
      resultQuery[column] = new RegExp(value, "i");
    }
  }

  return resultQuery;
};
