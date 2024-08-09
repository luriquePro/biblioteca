import { GerarId } from "../../../common/GerarId";
import { IEditoraDTO } from "../../../types/Editora.types";
import { IEditoraRepositorio } from "../Editora.interfaces";
import { ICadastrarEditoraDTO } from "./CadastrarEditora.interface";
import { CadastrarEditoraUseCase } from "./CadastrarEditora.usecase";

describe("CadastrarEditoraUseCase", () => {
  const EditoraRepositorio: IEditoraRepositorio = {
    cadastrar: jest.fn(),
    buscarEditora: jest.fn().mockResolvedValue(null),
    listarEditoras: jest.fn().mockReturnValue([])
  };

  test("Deve-se cadastrar uma nova editora", async () => {
    const sut = new CadastrarEditoraUseCase(EditoraRepositorio);
    const output = await sut.handle({ editora: "editora_valido" });

    expect(output).toBeUndefined();

    expect(EditoraRepositorio.cadastrar).toHaveBeenCalledTimes(1);
    expect(EditoraRepositorio.cadastrar).toHaveReturnedWith(undefined);

    expect(EditoraRepositorio.buscarEditora).toHaveBeenCalledTimes(1);
  });

  test("Deve-se retornar erro se a editora já está cadastrada", async () => {
    const cadastrarEditoraDTO: ICadastrarEditoraDTO = { editora: "editora_existente" };
    const EditoraDTO: IEditoraDTO = { ...cadastrarEditoraDTO, id: GerarId() };

    (EditoraRepositorio.buscarEditora as jest.Mock).mockResolvedValue(EditoraDTO);

    const sut = new CadastrarEditoraUseCase(EditoraRepositorio);
    await expect(sut.handle(cadastrarEditoraDTO)).rejects.toThrow("Editora já cadastrada");
    expect(EditoraRepositorio.cadastrar).toHaveBeenCalledTimes(0);
  });
});
