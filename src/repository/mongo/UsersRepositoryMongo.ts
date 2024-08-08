import {
  IBuscarUsuarioFiltroDTO,
  ICadastrarUsuarioReturnDTO,
  IUsuarioRepositorio
} from "../../application/CadastrarUsuario/CadastrarUsuario.interfaces";
import { Usuario } from "../../models/Usuario";
import { IUsuarioDTO } from "../../types/Usuario.types";

export class UsuarioRepositorioMongo implements IUsuarioRepositorio {
  public async listar(): Promise<IUsuarioDTO[]> {
    return await Usuario.find().lean();
  }

  public async cadastrar(dadosDoUsuario: ICadastrarUsuarioReturnDTO): Promise<IUsuarioDTO> {
    return await new Usuario(dadosDoUsuario).save();
  }

  public async buscarUsuario(filter: IBuscarUsuarioFiltroDTO): Promise<IUsuarioDTO | null> {
    return await Usuario.findOne(filter).lean();
  }

  public async buscarUsuarios(filter: IBuscarUsuarioFiltroDTO): Promise<IUsuarioDTO[]> {
    return await Usuario.find(filter).lean();
  }
}
