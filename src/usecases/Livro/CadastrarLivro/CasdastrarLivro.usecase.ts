import { GerarId } from "../../../common/GerarId";
import { IAutorRepositorio } from "../../Autor/Autor.interfaces";
import { IEditoraRepositorio } from "../../Editora/Editora.interfaces";
import { IGeneroRepositorio } from "../../Genero/Genero.interfaces";
import { ILivroRepositorio } from "../Livro.interfaces";
import { CadastrarLivroValidar } from "./CadastrarLivro.validar";
import { ICadastrarLivroDTO, ICadastrarLivroRawDTO } from "./CasdastrarLivro.interfaces";

export class CadastrarLivroUseCase {
  constructor(
    private readonly LivroRepositorio: ILivroRepositorio,
    private readonly AutorRepositorio: IAutorRepositorio,
    private readonly GeneroRepositorio: IGeneroRepositorio,
    private readonly EditoraRepositorio: IEditoraRepositorio
  ) {}

  public async handle({
    titulo,
    autores_ids,
    generos_ids,
    editora_id,
    edicao,
    ISBN,
    quantidade,
    data_lancamento,
    descricao,
    valor_de_compra,
    valor_de_venda,
    taxa_multa_diaria,
    valor_emprestimo_diario
  }: ICadastrarLivroRawDTO): Promise<void> {
    const cadastrarLivroRawDTO: ICadastrarLivroRawDTO = {
      titulo,
      autores_ids,
      generos_ids,
      editora_id,
      edicao,
      ISBN,
      quantidade,
      data_lancamento,
      descricao,
      valor_de_compra,
      valor_de_venda,
      taxa_multa_diaria,
      valor_emprestimo_diario
    };

    CadastrarLivroValidar(cadastrarLivroRawDTO);

    // Checar se todos os autores são validos
    const autoresExistentes = await this.AutorRepositorio.buscarAutores(autores_ids);
    if (autoresExistentes.length !== autores_ids.length) {
      throw new Error("Autores Invalidos");
    }

    // Checar se todos os generos são validos
    const generosExistentes = await this.GeneroRepositorio.buscarGeneros(generos_ids);
    if (generosExistentes.length !== generos_ids.length) {
      throw new Error("Gêneros Invalidos");
    }

    // Checar se a editora é válida
    const editoraExiste = await this.EditoraRepositorio.buscarEditora({ id: editora_id });
    if (!editoraExiste) {
      throw new Error("Editora Invalida");
    }

    // Checar se o ISBN é unico
    const livroComIsbnJaCadastrado = await this.LivroRepositorio.buscarLivro({ ISBN });
    if (livroComIsbnJaCadastrado) {
      throw new Error("ISBN Já cadastrado");
    }

    const cadastrarLivroDTO: ICadastrarLivroDTO = {
      id: GerarId(),
      titulo,
      autores_ids,
      generos_ids,
      editora: editoraExiste,
      autores: autoresExistentes,
      generos: generosExistentes,
      edicao,
      ISBN,
      quantidade,
      data_lancamento,
      data_detalhes: {
        dia: data_lancamento.getDate(),
        mes: data_lancamento.getMonth() + 1,
        ano: data_lancamento.getFullYear()
      },
      descricao,
      valor_de_compra,
      valor_de_venda,
      taxa_multa_diaria,
      valor_emprestimo_diario
    };

    await this.LivroRepositorio.cadastrar(cadastrarLivroDTO);
  }
}
