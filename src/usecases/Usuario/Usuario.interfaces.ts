import { IUsuarioDTO } from "../../types/Usuario.types";
import { ICadastrarUsuarioReturnDTO } from "./CadastrarUsuario/CadastrarUsuario.interfaces";

export interface IBuscarUsuarioFiltroDTO {
  id?: string;
  nome_completo?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
}

export interface IBuscarUsuarioPorCPFDTO {
  cpf: string;
}

export interface IUsuarioRepositorio {
  listar: () => Promise<IUsuarioDTO[]>;
  cadastrar: (dadosDoUsuario: ICadastrarUsuarioReturnDTO) => Promise<IUsuarioDTO>;
  buscarUsuario: (filtro: IBuscarUsuarioFiltroDTO) => Promise<IUsuarioDTO | null>;
  buscarUsuarios: (filtro: IBuscarUsuarioFiltroDTO) => Promise<IUsuarioDTO[]>;
}
