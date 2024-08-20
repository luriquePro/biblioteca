import { ListagemComPaginacaoPadraoSumarioGeralEDinamico } from "./../../../types/Paginacao";
import { PaginacaoDaBuscaRetorno } from "../../../types/Paginacao";

export interface IListarLivrosComPaginacaoRaw {
  id: string;
  titulo: string;
  ISBN: string;
  data_lancamento: Date;
  descricao: string;
  generos: string[];
  autores: string[];
  editora: string;
  edicao: number;
  valor_de_compra: number;
  valor_de_venda: number;
  taxa_multa_diaria: number;
  valor_de_emprestimo_diario: number;

  quantidade_total: number;
  quantidade_emprestada: number;
  quantidade_disponivel: number;

  quantidade_vezes_emprestadas: number;
  quantidade_vezes_vendidas: number;
  quantidade_vezes_devolvidas: number;
  
  total_arrecadado_venda: number;
  total_arrecadado_emprestimo: number;
  total_arrecadado_emprestimo_sem_multa: number;
  total_arrecadado_emprestimo_com_multa: number;
  total_valor_arrecadado: number;

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

  usuarios_compradores: {
    nome: string;
    id: string;
    data_compra: Date;
    valor_pago: number;
  }[];
  ultimo_usuario_comprador: {
    nome: string;
    id: string;
    data_compra: Date;
    valor_pago: number;
  };

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
