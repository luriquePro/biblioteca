import { GerarId } from "../../../common/GerarId";
import { IAutorDTO } from "../../../types/Autor.types";
import { IAutorRepositorio } from "../Autor.interfaces";
import { ICadastrarAutorDTO } from "./CadastrarAutor.interfaces";
import { CadastrarAutorValidar } from "./CadastrarAutor.validar";
class CadastrarAutorUseCase {
  constructor(private readonly AutorRepositorio: IAutorRepositorio) {}

  public async handle({ autor }: ICadastrarAutorDTO): Promise<void> {
    CadastrarAutorValidar({ autor });

    const autorJaCadastrado = await this.AutorRepositorio.buscarAutor({ autor });
    if (autorJaCadastrado) {
      throw new Error("Autor já cadastrado");
    }

    const cadastrarAutorDTO: IAutorDTO = { id: GerarId(), autor };
    await this.AutorRepositorio.cadastrar(cadastrarAutorDTO);
  }
}

export { CadastrarAutorUseCase };
