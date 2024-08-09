
import { ICadastrarUsuarioReturnDTO } from "../../application/Usuario/CadastrarUsuario/CadastrarUsuario.interfaces";
import { IBuscarUsuarioFiltroDTO, IUsuarioRepositorio } from "../../application/Usuario/Usuario.interfaces";
import { IUsuarioDTO } from "../../types/Usuario.types";

export class UsuarioRepositorioMemoria implements IUsuarioRepositorio {
  public users: IUsuarioDTO[] = [];

  constructor() {
    this.users = [];
  }

  public async listar(): Promise<IUsuarioDTO[]> {
    return this.users;
  }

  public async cadastrar(dadosDoUsuario: ICadastrarUsuarioReturnDTO): Promise<IUsuarioDTO> {
    this.users.push(dadosDoUsuario);
    return dadosDoUsuario;
  }

  public async buscarUsuario(filter: IBuscarUsuarioFiltroDTO): Promise<IUsuarioDTO | null> {
    return new Promise((resolve) => {
      const filterKeys = Object.keys(filter) as (keyof IBuscarUsuarioFiltroDTO)[];
      const matchingUser = this.users.find((user) => {
        return filterKeys.every((key) => user[key] == filter[key]);
      });
      resolve(matchingUser || null);
    });
  }

  public async buscarUsuarios(filter: IBuscarUsuarioFiltroDTO): Promise<IUsuarioDTO[]> {
    return new Promise((resolve) => {
      const filterKeys = Object.keys(filter) as (keyof IBuscarUsuarioFiltroDTO)[];
      const matchingUsers = this.users.filter((user) => {
        return filterKeys.every((key) => user[key] == filter[key]);
      });
      resolve(matchingUsers);
    });
  }
}
