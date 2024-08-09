import { IAutorDTO } from "./Autor.types";
import { IEditoraDTO } from "./Editora.types";
import { IGeneroDTO } from "./Genero.types";

export interface ILivroDTO {
  id: string;
  titulo: string;
  autores: IAutorDTO[];
  generos: IGeneroDTO[];
  autores_ids: string[];
  generos_ids: string[];
  editora: IEditoraDTO;
  edicao: number;
  ISBN: string;
  quantidade: number;
  data_lancamento: Date;
  data_detalhes: {
    dia: number;
    mes: number;
    ano: number;
  };
  descricao?: string;
  valor_de_compra?: number;
  valor_de_venda?: number;
}
