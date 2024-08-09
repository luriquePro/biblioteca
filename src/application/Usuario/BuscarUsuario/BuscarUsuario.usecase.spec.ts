import { IUsuarioDTO } from "../../../types/Usuario.types";
import { IUsuarioRepositorio } from "../CadastrarUsuario/CadastrarUsuario.interfaces";
import { BuscarUsuarioUseCase } from "./BuscarUsuario.usecase";

describe("BuscarUsuarioUseCase Casos de Uso", () => {
  const UsuariosRepositorio: IUsuarioRepositorio = {
    cadastrar: jest.fn(),
    buscarUsuario: jest.fn(),
    buscarUsuarios: jest.fn(),
    listar: jest.fn().mockReturnValue([])
  };

  test("Deve-se buscar um usuário por cpf", async () => {
    const usuarioDTO: IUsuarioDTO = {
      id: "id_valido",
      nome_completo: "nome_valido",
      cpf: "71079969403",
      telefone: "81999999999",
      email: "email_valido@email.com",
      data_nascimento: new Date("2004-01-01"),
      data_cadastro: new Date("2024-08-10"),
      endereco: "endereco_valido"
    };

    (UsuariosRepositorio.buscarUsuario as jest.Mock).mockResolvedValue(usuarioDTO);

    const sut = new BuscarUsuarioUseCase(UsuariosRepositorio);
    const output = await sut.handle({ cpf: "71079969403" });

    expect(output).toEqual(usuarioDTO);
    expect(UsuariosRepositorio.buscarUsuario).toHaveBeenCalledTimes(1);
  });

  test("Deve-se retornar null ao não encontrar o usuário", async () => {
    (UsuariosRepositorio.buscarUsuario as jest.Mock).mockResolvedValue(null);

    const sut = new BuscarUsuarioUseCase(UsuariosRepositorio);
    const output = await sut.handle({ cpf: "71079969403" });

    expect(output).toBeNull();
    expect(UsuariosRepositorio.buscarUsuario).toHaveBeenCalledTimes(1);
  });
});

export { BuscarUsuarioUseCase };
