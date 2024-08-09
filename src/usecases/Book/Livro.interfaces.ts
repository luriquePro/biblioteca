import { ILivroDTO } from "../../types/Livro.types";
import { ICadastrarLivroDTO } from "./CadastrarLivro/CasdastrarLivro.interfaces";

export interface ILivroRepositorio {
  listarLivrosComPaginacao: () => Promise<ILivroDTO[]>;
  buscarLivros: (livro: ILivroFiltroDTO) => Promise<ILivroDTO[]>;
  buscarLivro: (livro: ILivroFiltroDTO) => Promise<ILivroDTO | null>;
  cadastrar: (livro: ICadastrarLivroDTO) => Promise<ILivroDTO>;
}

export interface ILivroFiltroDTO {
  id?: string;
  titulo?: string;
  ISBN?: string;
  quantidade?: number;
  data_lancamento?: string;
  descricao?: string;
  valor_de_compra?: number;
  valor_de_venda?: number;
}
