import moment from "moment";
import { IBuscaFiltros } from "../../../types/Paginacao";
import { ILivroRepositorio } from "../Livro.interfaces";
import { IListarLivrosComPaginacao } from "./ListarLivrosComPaginacao.interface";
import { ListarLivrosComPaginacao } from "./ListarLivrosComPaginacao.usecase";

jest.mock("../../../types/Paginacao");
jest.mock("../Livro.interfaces");

describe("ListarLivrosComPaginacao", () => {
  let usecase: ListarLivrosComPaginacao;
  let mockLivroRepositorio: jest.Mocked<ILivroRepositorio>;

  beforeEach(() => {
    mockLivroRepositorio = {
      quantidadeLivros: jest.fn(),
      listarLivrosComPaginacao: jest.fn(),
      sumarioGeralDeListarLivros: jest.fn()
    } as unknown as jest.Mocked<ILivroRepositorio>;

    usecase = new ListarLivrosComPaginacao(mockLivroRepositorio);
  });

  it("should return a list of books with pagination data", async () => {
    const dadosDaQuery: IBuscaFiltros = {
      paginaAtual: 1,
      quantidadesItemsPorPagina: 10,
      classificacao: { campo: 1 },
      filtrosBusca: { campo: "valor" }
    };

    const expectedPagination: IListarLivrosComPaginacao["paginacao"] = {
      pagina_atual: dadosDaQuery.paginaAtual,
      quantidades_total_de_paginas: 1
    };

    const expectedSumario: IListarLivrosComPaginacao["sumario"] = {
      sumario_geral: {
        quantidade_livros_aguardando_lancamento: 0,
        quantidade_livros_atrasados: 0,
        quantidade_livros_disponiveis: 0,
        quantidade_livros_emprestados: 0,
        quantidade_livros_indisponiveis: 0,
        quantidade_livros_total: 0
      },
      sumario_dinamico: {
        quantidade_livros_aguardando_lancamento: 0,
        quantidade_livros_atrasados: 0,
        quantidade_livros_disponiveis: 0,
        quantidade_livros_emprestados: 0,
        quantidade_livros_indisponiveis: 0,
        quantidade_livros_total: 0
      }
    };

    const expectedListagem: IListarLivrosComPaginacao["listagem"] = [
      {
        id: "id_valido",
        titulo: "titulo_valido",
        ISBN: "ISBN_valido",
        generos: ["genero_valido"],
        autores: ["autor_valido"],
        editora: "editora_valida",
        edicao: 1,
        data_lancamento: moment("2022-01-01").toDate(),
        descricao: "descricao_valida",

        quantidade_total: 10,
        quantidade_emprestada: 2,
        quantidade_disponivel: 8,
        quantidade_vezes_vendidas: 0,

        valor_de_compra: 10,
        valor_de_venda: 25,
        valor_de_emprestimo: 5,
        taxa_multa: 0.05,

        quantidade_vezes_emprestadas: 10,
        quantidade_vezes_devolvidas: 9,

        total_arrecadado_emprestimo: 60,
        total_arrecadado_emprestimo_sem_multa: 45,
        total_arrecadado_emprestimo_com_multa: 60,
        total_arrecadado_venda: 50,
        total_valor_arrecadado: 50,

        usuarios_que_pegaram_emprestado: [
          {
            nome: "nome_valido",
            id: "id_valido",
            data_emprestimo: moment("2022-01-01").toDate(),
            data_devolucao: moment("2022-01-01").toDate(),
            dias_atraso: 0,
            multa_atual: 0,
            multa_total: 0
          }
        ],
        ultimo_usuario_emprestado: {
          nome: "nome_valido",
          id: "id_valido",
          data_emprestimo: moment("2022-01-01").toDate(),
          data_devolucao: moment("2022-01-01").toDate(),
          dias_atraso: 0,
          multa_atual: 0,
          multa_total: 0
        },

        usuarios_compradores: [
          {
            nome: "nome_valido",
            id: "id_valido",
            data_compra: moment("2022-01-01").toDate(),
            valor_pago: 10
          }
        ],
        ultimo_usuario_comprador: {
          nome: "nome_valido",
          id: "id_valido",
          data_compra: moment("2022-01-01").toDate(),
          valor_pago: 10
        },

        data_cadastro: moment("2022-01-01").toDate(),
        ultima_atualizacao: moment("2022-01-01").toDate()
      }
    ];

    mockLivroRepositorio.quantidadeLivros.mockResolvedValue(10);
    mockLivroRepositorio.listarLivrosComPaginacao.mockResolvedValue(expectedListagem);
    mockLivroRepositorio.sumarioGeralDeListarLivros.mockResolvedValue(expectedSumario.sumario_geral);
    mockLivroRepositorio.sumarioGeralDeListarLivros.mockResolvedValue(expectedSumario.sumario_dinamico);

    const result = await usecase.handle(dadosDaQuery);

    expect(result).toEqual({
      paginacao: expectedPagination,
      sumario: expectedSumario,
      listagem: expectedListagem
    });
  });
});
