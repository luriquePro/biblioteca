import { GerarId } from "../../../common/GerarId";
import { EditoraRepositorioJest } from "../../../test/repositorios/EditoraRepositorioJest";
import { IEditoraDTO } from "../../../types/Editora.types";
import { ICadastrarEditoraDTO } from "./CadastrarEditora.interface";
import { CadastrarEditoraUseCase } from "./CadastrarEditora.usecase";

describe("CadastrarEditoraUseCase", () => {
  test("Deve-se cadastrar uma nova editora", async () => {
    const sut = new CadastrarEditoraUseCase(EditoraRepositorioJest);
    const output = await sut.handle({ editora: "editora_valido" });

    expect(output).toBeUndefined();

    expect(EditoraRepositorioJest.cadastrar).toHaveBeenCalledTimes(1);
    expect(EditoraRepositorioJest.cadastrar).toHaveReturnedWith(undefined);

    expect(EditoraRepositorioJest.buscarEditora).toHaveBeenCalledTimes(1);
  });

  test("Deve-se retornar erro se a editora já está cadastrada", async () => {
    const cadastrarEditoraDTO: ICadastrarEditoraDTO = { editora: "editora_existente" };
    const EditoraDTO: IEditoraDTO = { ...cadastrarEditoraDTO, id: GerarId() };

    (EditoraRepositorioJest.buscarEditora as jest.Mock).mockResolvedValue(EditoraDTO);

    const sut = new CadastrarEditoraUseCase(EditoraRepositorioJest);
    await expect(sut.handle(cadastrarEditoraDTO)).rejects.toThrow("Editora já cadastrada");
    expect(EditoraRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
  });
});
