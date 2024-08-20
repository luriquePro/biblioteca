import { IEmprestarLivroDTO } from "./EmprestarLivro/EmprestarLivro.interface";

export interface ILivroMovimentacoesRepositorio {
  emprestarLivro: (dadosEmprestimo: IEmprestarLivroDTO) => Promise<void>;
  quantidadeLivrosDisponiveis: (dadosBusca: { id_livro: string }) => Promise<number>;
}
