import { ILivroDTO } from "../../types/Livro.types";
import { IOpcoesDaBusca } from "../../types/Paginacao";
import { ICadastrarLivroDTO } from "./CadastrarLivro/CasdastrarLivro.interfaces";
import { IListarLivrosComPaginacaoRaw, IListarLivrosSumario } from "./ListarLivrosComPaginacao/ListarLivrosComPaginacao.interface";

export interface ILivroRepositorio {
  buscarLivros: (livro: ILivroFiltroDTO) => Promise<ILivroDTO[]>;
  buscarLivro: (livro: ILivroFiltroDTO) => Promise<ILivroDTO | null>;
  cadastrar: (livro: ICadastrarLivroDTO) => Promise<ILivroDTO>;

  listarLivrosComPaginacao: (opcoesDeBusca: IOpcoesDaBusca) => Promise<IListarLivrosComPaginacaoRaw[]>;
  quantidadeLivros: (opcoesDeBusca: IOpcoesDaBusca) => Promise<number>;
  sumarioGeralDeListarLivros: (opcoesDeBusca?: IOpcoesDaBusca) => Promise<IListarLivrosSumario>;
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
