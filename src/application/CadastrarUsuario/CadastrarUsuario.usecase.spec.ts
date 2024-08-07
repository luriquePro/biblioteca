import { ICadastrarUsuarioDTO } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioUseCase } from "./CadastrarUsuario.usecase";

describe("cadastrar Usuário Casos de Uso", () => {
  test("Deve-se cadastrar um novo Usuário", async () => {
    const usuarioDTO: ICadastrarUsuarioDTO = {
      nomeCompleto: "nome_valido",
      cpf: "cpf_valido",
      telefone: "telefone_valido",
      email: "email_valido@email.com",
      dataNascimento: new Date("2004-01-01"),
      endereco: "endereco_valido"
    };

    const sut = new CadastrarUsuarioUseCase().handle;
    const output = await sut(usuarioDTO);

    expect(output).toBeUndefined();
  });
});
