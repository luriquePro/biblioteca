import moment from "moment";
import { GerarId } from "../../../common/GerarId";
import { ILivroDTO } from "../../../types/Livro.types";
import { ILivroRepositorio } from "../../Livro/Livro.interfaces";
import { IUsuarioRepositorio } from "../../Usuario/Usuario.interfaces";
import { ILivroMovimentacoesRepositorio } from "../livroMovimentacoes.interface";
import { EmprestarLivroUseCase } from "./EmprestarLivro.usecase";
import { IUsuarioDTO } from "../../../types/Usuario.types";
import { BadRequestError, NotFoundError } from "../../../shared/errors/AppError";

describe("EmprestarLivroUseCase", () => {
  let mockLivroRepositorio: jest.Mocked<ILivroRepositorio>;
  let mockLivroMovimentacoesRepositorio: jest.Mocked<ILivroMovimentacoesRepositorio>;
  let mockUsuarioRepositorio: jest.Mocked<IUsuarioRepositorio>;
  let emprestarLivroUseCase: EmprestarLivroUseCase;

  let livroDTO: ILivroDTO;
  let usuarioDTO: IUsuarioDTO;

  beforeEach(() => {
    mockLivroRepositorio = {
      buscarLivro: jest.fn(),
      quantidadeLivros: jest.fn(),
      listarLivrosComPaginacao: jest.fn(),
      sumarioGeralDeListarLivros: jest.fn()
    } as unknown as jest.Mocked<ILivroRepositorio>;

    mockLivroMovimentacoesRepositorio = {
      emprestarLivro: jest.fn(),
      quantidadeLivrosDisponiveis: jest.fn()
    } as unknown as jest.Mocked<ILivroMovimentacoesRepositorio>;

    mockUsuarioRepositorio = {
      buscarUsuario: jest.fn()
    } as unknown as jest.Mocked<IUsuarioRepositorio>;

    livroDTO = {
      id: GerarId(),
      titulo: "titulo_valido",
      autores: [{ autor: "autor_valido", id: "id_valido" }],
      generos: [{ genero: "genero_valido", id: "id_valido" }],
      autores_ids: ["id_valido"],
      generos_ids: ["id_valido"],
      editora: {
        editora: "editora_valida",
        id: "id_valida"
      },
      edicao: 1,
      ISBN: "123",
      quantidade: 1,
      data_lancamento: moment().toDate(),
      data_detalhes: {
        dia: 20,
        mes: 7,
        ano: 24
      },
      descricao: "descricao-valida",
      valor_de_compra: 1,
      valor_de_venda: 1,
      valor_emprestimo_diario: 1,
      taxa_multa_diaria: 0.01
    };

    usuarioDTO = {
      id: GerarId(),
      nome_completo: "nome_validop",
      cpf: "cpf_valido",
      email: "email_valido",
      telefone: "telefone_valido",
      data_nascimento: moment().toDate(),
      data_cadastro: moment().toDate(),
      endereco: "endereco_valido"
    };

    emprestarLivroUseCase = new EmprestarLivroUseCase(mockLivroMovimentacoesRepositorio, mockLivroRepositorio, mockUsuarioRepositorio);
  });

  test("Deve-se emprestar um livro quando os dados forem válidos", async () => {
    const id_livro = GerarId();
    const id_usuario = GerarId();
    const periodo_dias = 5;

    mockLivroRepositorio.buscarLivro.mockResolvedValue(livroDTO);
    mockUsuarioRepositorio.buscarUsuario.mockResolvedValue(usuarioDTO);
    mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis.mockResolvedValue(5);

    await emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias });

    expect(mockLivroRepositorio.buscarLivro).toHaveBeenCalledWith({ id: id_livro });
    expect(mockUsuarioRepositorio.buscarUsuario).toHaveBeenCalledWith({ id: id_usuario });
    expect(mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis).toHaveBeenCalledWith({ id_livro });

    expect(mockLivroRepositorio.buscarLivro).toHaveBeenCalledTimes(1);
    expect(mockUsuarioRepositorio.buscarUsuario).toHaveBeenCalledTimes(1);
    expect(mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis).toHaveBeenCalledTimes(1);
    expect(mockLivroMovimentacoesRepositorio.emprestarLivro).toHaveBeenCalledTimes(1);
  });

  test("Deve falhar se o livro não for encontrado", async () => {
    const id_livro = GerarId();
    const id_usuario = GerarId();
    const periodo_dias = 5;

    mockLivroRepositorio.buscarLivro.mockResolvedValue(null);

    await expect(emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias })).rejects.toThrow(
      new NotFoundError("Livro não encontrado")
    );

    expect(mockLivroRepositorio.buscarLivro).toHaveBeenCalledTimes(1);
    expect(mockUsuarioRepositorio.buscarUsuario).toHaveBeenCalledTimes(0);
    expect(mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis).toHaveBeenCalledTimes(0);
    expect(mockLivroMovimentacoesRepositorio.emprestarLivro).toHaveBeenCalledTimes(0);
  });

  test("Deve falhar se o usuário não for encontrado", async () => {
    const id_livro = GerarId();
    const id_usuario = GerarId();
    const periodo_dias = 5;

    mockLivroRepositorio.buscarLivro.mockResolvedValue(livroDTO);
    mockUsuarioRepositorio.buscarUsuario.mockResolvedValue(null);

    await expect(emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias })).rejects.toThrow(
      new NotFoundError("Usuario não encontrado")
    );

    expect(mockLivroRepositorio.buscarLivro).toHaveBeenCalledTimes(1);
    expect(mockUsuarioRepositorio.buscarUsuario).toHaveBeenCalledTimes(1);
    expect(mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis).toHaveBeenCalledTimes(0);
    expect(mockLivroMovimentacoesRepositorio.emprestarLivro).toHaveBeenCalledTimes(0);
  });

  test("Deve falhar se não houver unidades disponíveis", async () => {
    const id_livro = GerarId();
    const id_usuario = GerarId();
    const periodo_dias = 5;

    mockLivroRepositorio.buscarLivro.mockResolvedValue(livroDTO);
    mockUsuarioRepositorio.buscarUsuario.mockResolvedValue(usuarioDTO);
    mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis.mockResolvedValue(0);

    await expect(emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias })).rejects.toThrow(
      new BadRequestError("O Livro selecionado não possui unidades disponiveis.")
    );

    expect(mockLivroRepositorio.buscarLivro).toHaveBeenCalledTimes(1);
    expect(mockUsuarioRepositorio.buscarUsuario).toHaveBeenCalledTimes(1);
    expect(mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis).toHaveBeenCalledTimes(1);
    expect(mockLivroMovimentacoesRepositorio.emprestarLivro).toHaveBeenCalledTimes(0);
  });
});
