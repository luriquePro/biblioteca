import { IUsuarioDTO } from "../../types/Usuario.types";

export interface ICadastrarUsuarioDTO {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: string;
  email: string;
  dataNascimento: Date;
}

export interface ICadastrarUsuarioReturnDTO {
  id: string;
  nome_completo: string;
  cpf: string;
  telefone: string;
  endereco: string;
  email: string;
  data_nascimento: Date;
  data_cadastro: Date;
}

export interface IBuscarUsuarioFiltroDTO {
  id?: string;
  nome_completo?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
}

export interface IBuscarUsuarioPorCPFDTO {
  cpf: string
}

export interface IUsuarioRepositorio {
  listar: () => Promise<IUsuarioDTO[]>;
  cadastrar: (dadosDoUsuario: ICadastrarUsuarioReturnDTO) => Promise<IUsuarioDTO>;
  buscarUsuario: (filtro: IBuscarUsuarioFiltroDTO) => Promise<IUsuarioDTO | null>;
  buscarUsuarios: (filtro: IBuscarUsuarioFiltroDTO) => Promise<IUsuarioDTO[]>;
}
