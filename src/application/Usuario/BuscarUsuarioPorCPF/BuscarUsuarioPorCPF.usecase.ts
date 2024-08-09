import { UnauthorizedError } from "../../../shared/errors/AppError";
import { IUsuarioDTO } from "../../../types/Usuario.types";
import { IBuscarUsuarioPorCPFDTO, IUsuarioRepositorio } from "../Usuario.interfaces";

class BuscarUsuarioPorCPFUseCase {
  constructor(private readonly UsuariosRepositorio: IUsuarioRepositorio) {}

  public async handle({ cpf }: IBuscarUsuarioPorCPFDTO): Promise<IUsuarioDTO | null> {
    if (!cpf) {
      throw new UnauthorizedError("CPF inválido");
    }
    return this.UsuariosRepositorio.buscarUsuario({ cpf });
  }
}

export { BuscarUsuarioPorCPFUseCase };
