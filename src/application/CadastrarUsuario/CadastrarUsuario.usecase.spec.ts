import { UsuarioRepositorioMemoria } from "../../repository/memory/UsersRepository";
import { ICadastrarUsuarioDTO, IUsuarioRepositorio } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioUseCase } from "./CadastrarUsuario.usecase";

describe("cadastrar Usuário Casos de Uso", () => {
  const UsuariosRepositorio: IUsuarioRepositorio = {
    cadastrar: jest.fn(),
    buscarUsuario: jest.fn(),
    listar: jest.fn().mockReturnValue([])
  };

  test("Deve-se cadastrar um novo Usuário", async () => {
    const usuarioDTO: ICadastrarUsuarioDTO = {
      nomeCompleto: "nome_valido",
      cpf: "71079969403",
      telefone: "81999999999",
      email: "email_valido@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    };

    const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio);
    const output = await sut.handle(usuarioDTO);

    expect(output).toBeUndefined();
    expect(UsuariosRepositorio.cadastrar).toHaveBeenCalledTimes(1);
    expect(UsuariosRepositorio.cadastrar).toHaveReturnedWith(undefined);
  });

  // Email Unico

  test("Deve-se retornar um erro caso o email seja inválido", async () => {
    const usuarioRepositorioMemoria = new UsuarioRepositorioMemoria();
    const sut = new CadastrarUsuarioUseCase(usuarioRepositorioMemoria).handle.bind(new CadastrarUsuarioUseCase(usuarioRepositorioMemoria));

    await sut({
      nomeCompleto: "nome_valido",
      cpf: "09984019004",
      telefone: "70140108084",
      email: "email_valido@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    });

    await expect(() =>
      sut({
        nomeCompleto: "nome_valido",
        cpf: "08009240028",
        telefone: "16063533060",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      })
    ).rejects.toThrow("Email já cadastrado");
  });

  // Telefone Unico

  test("Deve-se retornar um erro caso o telefone seja inválido", async () => {
    const usuarioRepositorioMemoria = new UsuarioRepositorioMemoria();
    const sut = new CadastrarUsuarioUseCase(usuarioRepositorioMemoria).handle.bind(new CadastrarUsuarioUseCase(usuarioRepositorioMemoria));

    await sut({
      nomeCompleto: "nome_valido",
      cpf: "43824021072",
      telefone: "09984019004",
      email: "email_valido1@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    });

    await expect(() =>
      sut({
        nomeCompleto: "nome_valido",
        cpf: "50342280090",
        telefone: "09984019004",
        email: "email_valido2@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      })
    ).rejects.toThrow("Telefone já cadastrado");
  });

  // CPF unico

  test("Deve-se retornar um erro caso o cpf seja inválido", async () => {
    const usuarioRepositorioMemoria = new UsuarioRepositorioMemoria();
    const sut = new CadastrarUsuarioUseCase(usuarioRepositorioMemoria).handle.bind(new CadastrarUsuarioUseCase(usuarioRepositorioMemoria));

    await sut({
      nomeCompleto: "nome_valido",
      cpf: "09984019004",
      telefone: "70140108084",
      email: "email_valido1@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    });

    await expect(() =>
      sut({
        nomeCompleto: "nome_valido",
        cpf: "09984019004",
        telefone: "16063533060",
        email: "email_valido2@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      })
    ).rejects.toThrow("CPF já cadastrado");
  });
});
