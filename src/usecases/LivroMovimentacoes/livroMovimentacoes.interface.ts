import { IEmprestarLivroDTO } from "./EmprestarLivro/EmprestarLivro.interface";

export interface ILivroMovimentacoesRepositorio {
  emprestarLivro: (dadosEmprestimo: IEmprestarLivroDTO) => Promise<void>;
  checarEmprestimo: (dadosBusca: ILivrosChecarEmprestimoDTO) => Promise<boolean>;
  quantidadeLivrosDisponiveis: (dadosBusca: ILivrosDisponiveisDTO) => Promise<number>;
}

export interface ILivroBuscaDTO {
  id_livro?: string;
}

export interface ILivrosDisponiveisDTO {
  id_livro: string;
}

export interface ILivrosChecarEmprestimoDTO {
  id_livro: string;
  id_usuario: string;
}
