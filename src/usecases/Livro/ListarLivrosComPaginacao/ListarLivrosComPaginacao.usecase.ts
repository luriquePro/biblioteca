import { formatarBuscaParaMongo } from "../../../common/formatarBuscaParaMongo";
import { IBuscaFiltros, IOpcoesDaBusca } from "../../../types/Paginacao";
import { ILivroRepositorio } from "../Livro.interfaces";
import { IListarLivrosComPaginacao } from "./ListarLivrosComPaginacao.interface";

export class ListarLivrosComPaginacaoUseCase {
  constructor(private readonly LivroRepositorio: ILivroRepositorio) {}

  public async handle(dadosDaQuery: IBuscaFiltros): Promise<IListarLivrosComPaginacao> {
    const opcoesDeBusca: IOpcoesDaBusca = {
      paginacao: { paginaAtual: dadosDaQuery.paginaAtual, quantidadesItemsPorPagina: dadosDaQuery.quantidadesItemsPorPagina },
      classificacao: dadosDaQuery.classificacao,
      filtros: formatarBuscaParaMongo(dadosDaQuery.filtrosBusca)
    };

    const quantidadeDeLivros = await this.LivroRepositorio.quantidadeLivros(opcoesDeBusca);
    const livros = await this.LivroRepositorio.listarLivrosComPaginacao(opcoesDeBusca);
    const sumarioGeral = await this.LivroRepositorio.sumarioGeralDeListarLivros();
    const sumarioDinamico = await this.LivroRepositorio.sumarioGeralDeListarLivros(opcoesDeBusca);

    const listarLivrosComPaginacao: IListarLivrosComPaginacao = {
      paginacao: {
        pagina_atual: opcoesDeBusca.paginacao.paginaAtual,
        quantidades_total_de_paginas: Math.ceil((quantidadeDeLivros || 1) / opcoesDeBusca.paginacao.quantidadesItemsPorPagina)
      },
      sumario: {
        sumario_geral: sumarioGeral,
        sumario_dinamico: sumarioDinamico
      },
      listagem: livros
    };

    return listarLivrosComPaginacao;
  }
}
