import { IEditoraDTO } from "../../../types/Editora.types";
import { IEditoraRepositorio } from "../Editora.interfaces";

class ListarEditorasUseCase {
  constructor(private readonly EditoraRepositorio: IEditoraRepositorio) {}

  public async handle(): Promise<IEditoraDTO[]> {
    return await this.EditoraRepositorio.listarEditoras();
  }
}

export { ListarEditorasUseCase };
