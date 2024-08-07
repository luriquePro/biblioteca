import { ICadastrarUsuarioDTO, IUsuarioRepositorio } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioUseCase } from "./CadastrarUsuario.usecase";

describe("cadastrar Usuário Casos de Uso", () => {
  const UsuariosRepositorio: IUsuarioRepositorio = {
    cadastrar: jest.fn()
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

  test("Deve-se retornar um erro caso o nome seja inválido", async () => {
    const usuarioDTO: ICadastrarUsuarioDTO = {
      nomeCompleto: "",
      cpf: "71079969403",
      telefone: "81999999999",
      email: "email_valido@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    };

    const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
    await expect(sut(usuarioDTO)).rejects.toThrow();
  });

  // test("Deve-se retornar um erro caso o cpf seja Vazio", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "",
  //     telefone: "81999999999",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso o cpf seja inválido", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "1111111",
  //     telefone: "81999999999",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso o cpf seja inválido", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "11111111111",
  //     telefone: "81999999999",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso o telefone seja Vazio", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "71079969403",
  //     telefone: "",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso o telefone seja inválido", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "71079969403",
  //     telefone: "123123123123211231",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso o telefone seja inválido", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "71079969403",
  //     telefone: "123123",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso o email seja inválido", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "71079969403",
  //     telefone: "81999999999",
  //     email: "",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso a data de nascimento seja inválida", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "71079969403",
  //     telefone: "81999999999",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: "endereco_valido"
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });

  // test("Deve-se retornar um erro caso o endereço seja inválido", async () => {
  //   const usuarioDTO: ICadastrarUsuarioDTO = {
  //     nomeCompleto: "nome_valido",
  //     cpf: "71079969403",
  //     telefone: "81999999999",
  //     email: "email_valido@email.com",
  //     dataNascimento: new Date("2004-01-01"),
  //     endereco: ""
  //   };

  //   const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
  //   await expect(sut(usuarioDTO)).rejects.toThrow();
  // });
});
