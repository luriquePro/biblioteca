import { formatarBuscaParaMongo } from "../../../common/formatarBuscaParaMongo";
import { IBuscaFiltros, IOpcoesDaBusca } from "../../../types/Paginacao";
import { ILivroRepositorio } from "../Livro.interfaces";
import { IListarLivrosComPaginacao } from "./ListarLivrosComPaginacao.interface";

export class ListarLivrosComPaginacao {
  constructor(private readonly LivroRepositorio: ILivroRepositorio) {}

  public async handle(dadosDaQuery: IBuscaFiltros): Promise<IListarLivrosComPaginacao[]> {
    const options: IOpcoesDaBusca = {
      paginacao: { pagina: dadosDaQuery.pagina, quantidadesPorPagina: dadosDaQuery.quantidadesPorPagina },
      classificacao: dadosDaQuery.classificacao,
      filtros: formatarBuscaParaMongo(dadosDaQuery.filtrosBusca)
    };
    return await this.LivroRepositorio.listarLivrosComPaginacao();
  }
}
