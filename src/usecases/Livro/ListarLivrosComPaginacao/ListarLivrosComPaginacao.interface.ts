import { ListagemComPaginacaoPadraoSumarioGeralEDinamico } from "./../../../types/Paginacao";
import { PaginacaoDaBuscaRetorno } from "../../../types/Paginacao";

export interface IListarLivrosComPaginacaoRaw {
  id: string;
  titulo: string;
  ISBN: string;
  quantidade_total: number;
  quantidade_emprestada: number;
  quantidade_disponivel: number;
  data_lancamento: string;
  descricao: string;
  valor_de_compra: number;
  valor_de_venda: number;
  quantidade_vezes_emprestadas: number;
  quantidade_vezes_devolvidas: number;
  generos: string[];
  autores: string[];
  editora: string;
  edicao: number;
  usuarios_que_pegaram_emprestado: {
    nome: string;
    id: string;
    data_emprestimo: Date;
    data_devolucao?: Date;
    dias_atraso?: number;
    multa_atual?: number;
    multa_total?: number;
  }[];
  ultimo_usuario_emprestado: {
    nome: string;
    id: string;
    data_emprestimo: Date;
    data_devolucao?: Date;
    dias_atraso?: number;
    multa_atual?: number;
    multa_total?: number;
  };
  total_valor_arrecadado: number;
  data_cadastro: Date;
  ultima_atualizacao: Date;
}

export interface IListarLivrosSumario {
  quantidade_livros_total: number;
  quantidade_livros_emprestados: number;
  quantidade_livros_atrasados: number;
  quantidade_livros_disponiveis: number;
  quantidade_livros_indisponiveis: number;
  quantidade_livros_aguardando_lancamento: number;
}

export type IListarLivrosComPaginacao = ListagemComPaginacaoPadraoSumarioGeralEDinamico<
  PaginacaoDaBuscaRetorno,
  IListarLivrosSumario,
  IListarLivrosSumario,
  IListarLivrosComPaginacaoRaw
>;
