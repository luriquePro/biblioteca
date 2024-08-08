import {
  IBuscarUsuarioFiltroDTO,
  ICadastrarUsuarioReturnDTO,
  IUsuarioRepositorio
} from "../../application/CadastrarUsuario/CadastrarUsuario.interfaces";

export class UsuarioRepositorioMemoria implements IUsuarioRepositorio {
  public users: ICadastrarUsuarioReturnDTO[] = [];

  constructor() {
    this.users = [];
  }

  public async listar(): Promise<ICadastrarUsuarioReturnDTO[]> {
    return this.users;
  }

  public async cadastrar(dadosDoUsuario: ICadastrarUsuarioReturnDTO): Promise<ICadastrarUsuarioReturnDTO> {
    this.users.push(dadosDoUsuario);
    return dadosDoUsuario;
  }

  public async buscarUsuario(filter: IBuscarUsuarioFiltroDTO): Promise<ICadastrarUsuarioReturnDTO | null> {
    return new Promise((resolve) => {
      const filterKeys = Object.keys(filter) as (keyof IBuscarUsuarioFiltroDTO)[];
      const matchingUser = this.users.find((user) => {
        return filterKeys.every((key) => user[key] == filter[key]);
      });
      resolve(matchingUser || null);
    });
  }
}
