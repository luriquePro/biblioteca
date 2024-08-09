export interface ICadastrarLivroDTO {
  titulo: string;
  autores_ids: string[];
  generos_ids: string[];
  editora: string;
  edicao: number;
  ISBN: string;
  quantidade: number;
  data_lancamento: Date;
  descricao?: string;
  valor_de_compra?: number;
  valor_de_venda?: number;
}
