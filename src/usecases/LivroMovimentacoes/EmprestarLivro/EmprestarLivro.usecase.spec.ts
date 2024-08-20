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

    emprestarLivroUseCase = new EmprestarLivroUseCase(mockLivroMovimentacoesRepositorio, mockLivroRepositorio, mockUsuarioRepositorio);
  });

  // test("Deve-se emprestar um livro quando os dados forem válidos", async () => {
  //   const id_livro = GerarId();
  //   const id_usuario = GerarId();
  //   const periodo_dias = 5;

  //   const livroCadastrado = { id: id_livro, titulo: "Livro teste", valor_emprestimo_diario: 10 };
  //   const usuarioCadastrado = { id: id_usuario, nome_completo: "Usuario teste" };

  //   mockLivroRepositorio.buscarLivro.mockResolvedValue(livroCadastrado);
  //   mockUsuarioRepositorio.buscarUsuario.mockResolvedValue(usuarioCadastrado);
  //   mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis.mockResolvedValue(1);

  //   await emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias });

  //   expect(mockLivroRepositorio.buscarLivro).toHaveBeenCalledWith({ id: id_livro });
  //   expect(mockUsuarioRepositorio.buscarUsuario).toHaveBeenCalledWith({ id: id_usuario });
  //   expect(mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis).toHaveBeenCalledWith({ id_livro });
  //   expect(mockLivroMovimentacoesRepositorio.emprestarLivro).toHaveBeenCalledWith({
  //     id: expect.any(String),
  //     usuario: { id: id_usuario, nome_completo: "Usuario teste" },
  //     livro: {
  //       id: id_livro,
  //       titulo: "Livro teste",
  //       valor_emprestimo: 50,
  //       taxa_multa_diaria: 0
  //     },
  //     periodo_dias,
  //     data_emprestimo: expect.any(Date),
  //     data_previsao_devolucao: expect.any(Date)
  //   });
  // });

  // test("Deve falhar se o livro não for encontrado", async () => {
  //   const id_livro = GerarId();
  //   const id_usuario = GerarId();
  //   const periodo_dias = 5;

  //   mockLivroRepositorio.buscarLivro.mockResolvedValue(null);

  //   await expect(emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias })).rejects.toThrow(
  //     new NotFoundError("Livro não encontrado")
  //   );
  // });

  test("Deve falhar se o usuário não for encontrado", async () => {
    const id_livro = GerarId();
    const id_usuario = GerarId();
    const periodo_dias = 5;

    const livroDTO: ILivroDTO = {
      id: id_livro,
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

    mockLivroRepositorio.buscarLivro.mockResolvedValue(livroDTO);
    mockUsuarioRepositorio.buscarUsuario.mockResolvedValue(null);

    await expect(emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias })).rejects.toThrow(
      new NotFoundError("Usuario não encontrado")
    );
  });

  test("Deve falhar se não houver unidades disponíveis", async () => {
    const id_livro = GerarId();
    const id_usuario = GerarId();
    const periodo_dias = 5;

    const livroDTO: ILivroDTO = {
      id: id_livro,
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

    const UsuarioDTO: IUsuarioDTO = {
      id: "id_valido",
      nome_completo: "nome_validop",
      cpf: "cpf_valido",
      email: "email_valido",
      telefone: "telefone_valido",
      data_nascimento: moment().toDate(),
      data_cadastro: moment().toDate(),
      endereco: "endereco_valido"
    };

    mockLivroRepositorio.buscarLivro.mockResolvedValue(livroDTO);
    mockUsuarioRepositorio.buscarUsuario.mockResolvedValue(UsuarioDTO);
    mockLivroMovimentacoesRepositorio.quantidadeLivrosDisponiveis.mockResolvedValue(0);

    await expect(emprestarLivroUseCase.handle({ id_livro, id_usuario, periodo_dias })).rejects.toThrow(
      new BadRequestError("O Livro selecionado não possui unidades disponiveis.")
    );
  });
});
