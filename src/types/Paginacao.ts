import { FilterQuery } from "mongoose";

export type Query = string | string[] | object | object[];
export type Sort = Record<string, 1 | -1>;

export interface IOpcoesDaBusca {
  paginacao: PaginacaoDaBusca;
  classificacao?: Record<string, 1 | -1>;
  filtros?: FilterQuery<unknown>;
}

export type PaginacaoDaBusca = {
  pagina: number;
  quantidadesPorPagina: number;
};

export interface IBuscaFiltros {
  pagina: number;
  quantidadesPorPagina: number;
  classificacao: Record<string, 1 | -1>;
  filtrosBusca?: Query;
}
