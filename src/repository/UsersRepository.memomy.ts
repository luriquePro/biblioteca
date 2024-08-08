import {
  IBuscarUsuarioFiltroDTO,
  ICadastrarUsuarioReturnDTO,
  IUsuarioRepositorio
} from "../application/CadastrarUsuario/CadastrarUsuario.interfaces";

export class UsuarioRepositorioMemoria implements IUsuarioRepositorio {
  public users: any[] = [];

  public async cadastrar(dadosDoUsuario: ICadastrarUsuarioReturnDTO): Promise<void> {
    return new Promise((resolve) => {
      this.users.push(dadosDoUsuario);
      return resolve(undefined);
    });
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
