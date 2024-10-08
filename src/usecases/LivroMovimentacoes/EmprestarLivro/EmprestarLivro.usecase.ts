import moment from "moment";
import { GerarId } from "../../../common/GerarId";
import { BadRequestError, NotFoundError } from "../../../shared/errors/AppError";
import { ILivroRepositorio } from "../../Livro/Livro.interfaces";
import { IUsuarioRepositorio } from "../../Usuario/Usuario.interfaces";
import { ILivroMovimentacoesRepositorio } from "../livroMovimentacoes.interface";
import { IEmprestarLivroDTO, IEmprestarLivroRawDTO } from "./EmprestarLivro.interface";

export class EmprestarLivroUseCase {
  constructor(
    private readonly LivroMovimentacoesRepositorio: ILivroMovimentacoesRepositorio,
    private readonly LivroRepositorio: ILivroRepositorio,
    private readonly UsuarioRepositorio: IUsuarioRepositorio
  ) {}

  public async handle({ id_livro, id_usuario, periodo_dias }: IEmprestarLivroRawDTO): Promise<void> {
    // Checar se o livro está cadastrado
    const livroCadastrado = await this.LivroRepositorio.buscarLivro({ id: id_livro });
    if (!livroCadastrado) {
      throw new NotFoundError("Livro não encontrado");
    }

    // Checar se o usuario está cadastrado e valido
    const usuarioCadastrado = await this.UsuarioRepositorio.buscarUsuario({ id: id_usuario });
    if (!usuarioCadastrado) {
      throw new NotFoundError("Usuario não encontrado");
    }

    // Checar se o usuario já está com esse livro emprestado
    const existeEsteUsuarioComEsteLivroPendente = await this.LivroMovimentacoesRepositorio.checarEmprestimo({ id_livro, id_usuario });
    if (existeEsteUsuarioComEsteLivroPendente) {
      throw new BadRequestError("Esse usuario ja possui o livro emprestado");
    }

    // Checar se o livro tem unidades disponiveis
    const unidadesDisponiveisDoLivro = await this.LivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis({ id_livro });
    if (unidadesDisponiveisDoLivro < 1) {
      throw new BadRequestError("O Livro selecionado não possui unidades disponiveis.");
    }

    // Adicionar o emprestimo
    const dadosEmprestimoDoLivro: IEmprestarLivroDTO = {
      id: GerarId(),
      usuario: { id: usuarioCadastrado.id, nome_completo: usuarioCadastrado.nome_completo },
      livro: {
        id: livroCadastrado.id,
        titulo: livroCadastrado.titulo,
        valor_emprestimo: livroCadastrado.valor_emprestimo_diario * periodo_dias,
        taxa_multa_diaria: livroCadastrado.taxa_multa_diaria
      },
      periodo_dias: periodo_dias,
      data_emprestimo: moment().utc().toDate(),
      data_previsao_devolucao: moment().add(periodo_dias, "days").utc().toDate()
    };

    await this.LivroMovimentacoesRepositorio.emprestarLivro(dadosEmprestimoDoLivro);
  }
}
