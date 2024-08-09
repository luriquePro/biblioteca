import { IAutorDTO } from "../../../types/Autor.types";
import { IAutorRepositorio } from "../Autor.interfaces";

class ListarAutoresUseCase {
  constructor(private readonly AutorRepositorio: IAutorRepositorio) {}

  public async handle(): Promise<IAutorDTO[]> {
    return await this.AutorRepositorio.listarAutores();
  }
}

export { ListarAutoresUseCase };
