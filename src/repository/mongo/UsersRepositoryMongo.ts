import {
  IBuscarUsuarioFiltroDTO,
  ICadastrarUsuarioReturnDTO,
  IUsuarioRepositorio
} from "../../application/CadastrarUsuario/CadastrarUsuario.interfaces";
import { Usuario } from "../../models/Usuario";

export class UsuarioRepositorioMongo implements IUsuarioRepositorio {
  public async listar(): Promise<ICadastrarUsuarioReturnDTO[]> {
    return await Usuario.find().lean();
  }

  public async cadastrar(dadosDoUsuario: ICadastrarUsuarioReturnDTO): Promise<ICadastrarUsuarioReturnDTO> {
    return await new Usuario(dadosDoUsuario).save();
  }

  public async buscarUsuario(filter: IBuscarUsuarioFiltroDTO): Promise<ICadastrarUsuarioReturnDTO | null> {
    return await Usuario.findOne(filter).lean();
  }
}
