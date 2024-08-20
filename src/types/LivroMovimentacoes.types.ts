export interface ILivroMovimentacoesDTO {
  id: string;
  usuario: {
    id: string;
    nome_completo: string;
  };
  livro: {
    id: string;
    titulo: string;
    valor_emprestimo: number;
    taxa_multa_diaria: number;
  };
  periodo_dias: string;
  data_emprestimo: Date;
  data_previsao_devolucao: Date;

  data_devolucao?: Date;
  valor_total_pago?: number;
  valor_pago_multa?: number;
}
