import { GerarId } from "../../../common/GerarId";
import { IEditoraDTO } from "../../../types/Editora.types";
import { IEditoraRepositorio } from "../Editora.interfaces";
import { ICadastrarEditoraDTO } from "./CadastrarEditora.interface";
import { CadastrarEditoraValidar } from "./CadastrarEditora.validar";

class CadastrarEditoraUseCase {
  constructor(private readonly EditoraRepositorio: IEditoraRepositorio) {}

  public async handle({ editora }: ICadastrarEditoraDTO): Promise<void> {
    CadastrarEditoraValidar({ editora });

    const editoraJaCadastrado = await this.EditoraRepositorio.buscarEditora({ editora });
    if (editoraJaCadastrado) {
      throw new Error("Editora já cadastrada");
    }

    const cadastrarEditoraDTO: IEditoraDTO = { id: GerarId(), editora };
    await this.EditoraRepositorio.cadastrar(cadastrarEditoraDTO);
  }
}

export { CadastrarEditoraUseCase };
