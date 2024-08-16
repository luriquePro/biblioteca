import { EditoraRepositorioJest } from "../../../test/repositorios/EditoraRepositorioJest";
import { IEditoraDTO } from "../../../types/Editora.types";
import { ListarEditorasUseCase } from "./ListarEditoras.usecase";

describe("ListarEditorasUseCase", () => {
  test("Deve-se listar as editoras cadastradas", async () => {
    const listaEditoras: IEditoraDTO[] = [
      { id: "1", editora: "editora1" },
      { id: "2", editora: "editora2" },
      { id: "3", editora: "editora3" }
    ];

    (EditoraRepositorioJest.listarEditoras as jest.Mock).mockResolvedValue(listaEditoras);

    const sut = new ListarEditorasUseCase(EditoraRepositorioJest);
    const output = await sut.handle();

    expect(output).toStrictEqual(listaEditoras);
    expect(EditoraRepositorioJest.listarEditoras).toHaveBeenCalledTimes(1);
  });
});
