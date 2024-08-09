import { IUsuarioDTO } from "../../types/Usuario.types";
import { IBuscarUsuarioPorCPFDTO, IUsuarioRepositorio } from "../CadastrarUsuario/CadastrarUsuario.interfaces";

class BuscarUsuarioPorCPFUseCase {
  constructor(private readonly UsuariosRepositorio: IUsuarioRepositorio) {}

  public async handle({ cpf }: IBuscarUsuarioPorCPFDTO): Promise<IUsuarioDTO | null> {
    return this.UsuariosRepositorio.buscarUsuario({ cpf });
  }
}

export { BuscarUsuarioPorCPFUseCase };
