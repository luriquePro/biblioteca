import { ILivroDTO } from "../../../types/Livro.types";

export interface ICadastrarLivroRawDTO {
  titulo: string;
  autores_ids: string[];
  generos_ids: string[];
  editora_id: string;
  edicao: number;
  ISBN: string;
  quantidade: number;
  data_lancamento: Date;
  descricao?: string;
  valor_de_compra?: number;
  valor_de_venda?: number;
  valor_emprestimo_diario: number;
  taxa_multa_diaria: number;
}

export interface ICadastrarLivroDTO extends ILivroDTO {}
