export interface IEmprestarLivroRawDTO {
  id_usuario: string;
  id_livro: string;
  periodo_dias: number;
}

export interface IEmprestarLivroDTO {
  id: string;
  usuario: { id: string; nome_completo: string };
  livro: { id: string; titulo: string; valor_emprestimo: number; taxa_multa_diaria: number };
  periodo_dias: number;
  data_emprestimo: Date;
  data_previsao_devolucao: Date;
}
