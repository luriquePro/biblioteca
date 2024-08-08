import {
  IBuscarUsuarioFiltroDTO,
  ICadastrarUsuarioReturnDTO,
  IUsuarioRepositorio
} from "../../application/CadastrarUsuario/CadastrarUsuario.interfaces";
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
}
