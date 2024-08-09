import { IEditoraDTO } from "../../types/Editora.types";

export interface IEditoraRepositorio {
  cadastrar: (editora: IEditoraDTO) => Promise<IEditoraDTO>;
  listarEditoras: () => Promise<IEditoraDTO[]>;
  buscarEditora: (filtro: IEditoraFiltroDTO) => Promise<IEditoraDTO | null>;
}

export interface IEditoraFiltroDTO {
  editora?: string;
}
