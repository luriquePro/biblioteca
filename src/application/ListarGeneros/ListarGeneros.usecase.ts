import { IGeneroDTO, IGeneroRepositorio } from "../CadastrarGenero/CadastrarGenero.interface";

class ListarGenerosUseCase {
  constructor(private readonly GeneroRepositorio: IGeneroRepositorio) {}

  public async handle(): Promise<IGeneroDTO[]> {
    return await this.GeneroRepositorio.listarGeneros();
  }
}

export { ListarGenerosUseCase };
