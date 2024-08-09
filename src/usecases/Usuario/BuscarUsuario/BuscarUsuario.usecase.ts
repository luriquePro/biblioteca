import { IUsuarioDTO } from "../../../types/Usuario.types";
import { IBuscarUsuarioFiltroDTO, IUsuarioRepositorio } from "../Usuario.interfaces";

class BuscarUsuarioUseCase {
  constructor(private readonly UsuariosRepositorio: IUsuarioRepositorio) {}

  public async handle(dataFilter: IBuscarUsuarioFiltroDTO): Promise<IUsuarioDTO | null> {
    return this.UsuariosRepositorio.buscarUsuario(dataFilter);
  }
}

export { BuscarUsuarioUseCase };
