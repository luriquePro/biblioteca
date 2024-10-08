import { GerarId } from "../../../common/GerarId";
import { IGeneroDTO } from "../../../types/Genero.types";
import { IGeneroRepositorio } from "../Genero.interfaces";
import { ICadastrarGeneroDTO } from "./CadastrarGenero.interface";
import { CadastrarGeneroValidar } from "./CadastrarGenero.validar";

class CadastrarGeneroUseCase {
  constructor(private readonly GeneroRepositorio: IGeneroRepositorio) {}

  public async handle({ genero }: ICadastrarGeneroDTO): Promise<void> {
    CadastrarGeneroValidar({ genero });

    const generoJaCadastrado = await this.GeneroRepositorio.buscarGenero({ genero });
    if (generoJaCadastrado) {
      throw new Error("Genero já cadastrado");
    }

    const cadastrarGeneroDTO: IGeneroDTO = { id: GerarId(), genero };
    await this.GeneroRepositorio.cadastrar(cadastrarGeneroDTO);
  }
}

export { CadastrarGeneroUseCase };
