import { FilterQuery } from "mongoose";

export type Query = string | string[] | object | object[] | { [column: string]: string };
export type Sort = Record<string, 1 | -1>;

export interface IOpcoesDaBusca {
  paginacao: PaginacaoDaBusca;
  classificacao?: Record<string, 1 | -1>;
  filtros?: FilterQuery<unknown>;
}

export type PaginacaoDaBusca = {
  paginaAtual: number;
  quantidadesItemsPorPagina: number;
};

export type PaginacaoDaBuscaRetorno = {
  pagina_atual: number;
  quantidades_total_de_paginas: number;
};

export interface IBuscaFiltros {
  paginaAtual: number;
  quantidadesItemsPorPagina: number;
  classificacao: Record<string, 1 | -1>;
  filtrosBusca?: Query;
}

export type TiposFiltros = "date" | "number" | "boolean" | "exists" | "not-equals";

export interface IObjetoBusca {
  typeValue: TiposFiltros;
  value: string | number | Date | boolean;
}

export interface ISumarioGeralDinamico<T, U> {
  sumario_geral: T;
  sumario_dinamico: U;
}

export interface ListagemComPaginacaoPadraoSumarioGeralEDinamico<T, U, X, Z> {
  paginacao: T;
  sumario: ISumarioGeralDinamico<U, X>;
  listagem: Z[];
}
