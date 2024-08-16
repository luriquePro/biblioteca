import { IEditoraRepositorio } from "../../usecases/Editora/Editora.interfaces";

export const EditoraRepositorioJest: IEditoraRepositorio = {
  cadastrar: jest.fn(),
  buscarEditora: jest.fn().mockResolvedValue(null),
  listarEditoras: jest.fn().mockReturnValue([])
};
