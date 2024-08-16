import { UsuariosRepositorioJest } from "../../../test/repositorios/UsuarioRepositorioJest";
import { ICadastrarUsuarioDTO } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioUseCase } from "./CadastrarUsuario.usecase";

describe("cadastrar Usuário Casos de Uso", () => {
  test("Deve-se cadastrar um novo Usuário", async () => {
    const usuarioDTO: ICadastrarUsuarioDTO = {
      nomeCompleto: "nome_valido",
      cpf: "71079969403",
      telefone: "81999999999",
      email: "email_valido@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    };

    const sut = new CadastrarUsuarioUseCase(UsuariosRepositorioJest);
    const output = await sut.handle(usuarioDTO);

    expect(output).toBeUndefined();
    expect(UsuariosRepositorioJest.cadastrar).toHaveBeenCalledTimes(1);
    expect(UsuariosRepositorioJest.cadastrar).toHaveReturnedWith(undefined);
  });

  // Email Unico
  test("Deve-se retornar um erro caso o email seja inválido", async () => {
    (UsuariosRepositorioJest.buscarUsuario as jest.Mock).mockReturnValue({ email: "email_valido@email.com" });
    const sut = new CadastrarUsuarioUseCase(UsuariosRepositorioJest);

    const validDTO: ICadastrarUsuarioDTO = {
      nomeCompleto: "nome_valido",
      cpf: "43824021072",
      telefone: "81999999999",
      email: "email_valido1@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    };

    await expect(() => sut.handle(validDTO)).rejects.toThrow("Email já cadastrado");
    expect(UsuariosRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
    expect(UsuariosRepositorioJest.buscarUsuario).toHaveBeenCalledTimes(3);
  });

  // CPF unico
  test("Deve-se retornar um erro caso o cpf seja inválido", async () => {
    (UsuariosRepositorioJest.buscarUsuario as jest.Mock).mockReturnValueOnce(null).mockReturnValueOnce({ cpf: "43824021072" });
    const sut = new CadastrarUsuarioUseCase(UsuariosRepositorioJest);

    const validDTO: ICadastrarUsuarioDTO = {
      nomeCompleto: "nome_valido",
      cpf: "43824021072",
      telefone: "81999999999",
      email: "email_valido1@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    };

    await expect(() => sut.handle(validDTO)).rejects.toThrow("CPF já cadastrado");
    expect(UsuariosRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
    expect(UsuariosRepositorioJest.buscarUsuario).toHaveBeenCalledTimes(3);
  });

  // Telefone Unico
  test("Deve-se retornar um erro caso o telefone seja inválido", async () => {
    (UsuariosRepositorioJest.buscarUsuario as jest.Mock)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValue({ telefone: "09984019004" });
    const sut = new CadastrarUsuarioUseCase(UsuariosRepositorioJest);

    const validDTO: ICadastrarUsuarioDTO = {
      nomeCompleto: "nome_valido",
      cpf: "43824021072",
      telefone: "09984019004",
      email: "email_valido1@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    };

    await expect(() => sut.handle(validDTO)).rejects.toThrow("Telefone já cadastrado");
    expect(UsuariosRepositorioJest.cadastrar).toHaveBeenCalledTimes(0);
    expect(UsuariosRepositorioJest.buscarUsuario).toHaveBeenCalledTimes(3);
  });
});
