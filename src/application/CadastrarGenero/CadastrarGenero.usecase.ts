import { ICadastrarGeneroDTO, IGeneroRepositorio } from "./CadastrarGenero.interface";

class CadastrarGeneroUseCase {
  constructor(private readonly GeneroRepositorio: IGeneroRepositorio) {}

  public async handle({ genero }: ICadastrarGeneroDTO): Promise<void> {
    CadastrarGeneroValidar({ genero });
  }
}

export { CadastrarGeneroUseCase };
