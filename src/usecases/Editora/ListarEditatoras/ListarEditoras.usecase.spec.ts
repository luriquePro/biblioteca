import { IEditoraDTO } from "../../../types/Editora.types";
import { IEditoraRepositorio } from "../Editora.interfaces";
import { ListarEditorasUseCase } from "./ListarEditoras.usecase";

describe("ListarEditorasUseCase", () => {
  const EditoraRepositorio: IEditoraRepositorio = {
    cadastrar: jest.fn(),
    buscarEditora: jest.fn(),
    listarEditoras: jest.fn().mockResolvedValue(null)
  };

  test("Deve-se listar as editoras cadastradas", async () => {
    const listaEditoras: IEditoraDTO[] = [
      { id: "1", editora: "editora1" },
      { id: "2", editora: "editora2" },
      { id: "3", editora: "editora3" }
    ];

    (EditoraRepositorio.listarEditoras as jest.Mock).mockResolvedValue(listaEditoras);

    const sut = new ListarEditorasUseCase(EditoraRepositorio);
    const output = await sut.handle();

    expect(output).toStrictEqual(listaEditoras);
    expect(EditoraRepositorio.listarEditoras).toHaveBeenCalledTimes(1);
  });
});
