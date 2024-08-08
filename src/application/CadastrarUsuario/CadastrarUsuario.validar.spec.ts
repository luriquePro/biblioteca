import { ICadastrarUsuarioDTO } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioValidar } from "./CadastrarUsuario.validar";

describe("Validação do Casdastro de Usuario", () => {
  describe("Validação de Nome de Usuario", () => {
    test("Deve-se retornar um erro caso o nome completo seja Vazio", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "",
        cpf: "71079969403",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Nome Completo é obrigatorio");
    });

    test("Deve-se retornar um erro caso o nome completo tenha menos de 3 letras", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "aa",
        cpf: "71079969403",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Nome completo precisa ter pelo menos 3 caracteres");
    });
  });

  describe("Validação de Cpf", () => {
    test("Deve-se retornar um erro caso o cpf seja Vazio", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("CPF é obrigatorio");
    });

    test("Deve-se retornar um erro caso o cpf tenha menos de 11 digitos", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "1111111",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("CPF precisa ter pelo menos 3 caracteres");
    });

    test("Deve-se retornar um erro caso o cpf tenha mais de 11 digitos", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "1111111111111111",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("CPF precisa ter no máximo 3 caracteres");
    });

    test("Deve-se retornar um erro caso o cpf seja uma sequencia de numeros iguais", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "11111111111",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("CPF inválido");
    });

    test("Deve-se retornar um erro caso o cpf não seja válido", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "12312312321",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("CPF inválido");
    });
  });

  describe("Validação de Telefone", () => {
    test("Deve-se retornar um erro caso o telefone seja Vazio", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Telefone é obrigatorio");
    });

    test("Deve-se retornar um erro caso o telefone tenha menos de 11 digitos", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "81999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Telefone precisa ter pelo menos 3 caracteres");
    });

    test("Deve-se retornar um erro caso o telefone tenha mais de 11 digitos", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "819999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Telefone precisa ter no máximo 3 caracteres");
    });

    test("Deve-se retornar um erro caso o telefone seja uma sequencia de números iguais", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "11111111111",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Telefone inválido");
    });

    test("Deve-se retornar um erro caso o telefone não seja válido", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "a1231212321",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Telefone inválido");
    });
  });

  describe("Validação de Email", () => {
    test("Deve-se retornar um erro caso o email seja Vazio", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "81999999999",
        email: "",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Email é obrigatorio");
    });

    test("Deve-se retornar um erro caso o email seja inválido", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "81999999999",
        email: "email_invalido",
        dataNascimento: new Date("2004-01-01"),
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Email inválido");
    });
  });

  describe("Validação de Data de Nascimento", () => {
    test("Deve-se retornar um erro caso a data de nascimento seja Vazio", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: undefined!,
        endereco: "endereco_valido"
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Data de Nascimento é obrigatorio");
    });
  });

  describe("Validação de Endereço", () => {
    test("Deve-se retornar um erro caso o endereço seja Vazio", async () => {
      const usuarioDTO: ICadastrarUsuarioDTO = {
        nomeCompleto: "nome_valido",
        cpf: "71079969403",
        telefone: "81999999999",
        email: "email_valido@email.com",
        dataNascimento: new Date("2004-01-01"),
        endereco: ""
      };

      expect(async () => CadastrarUsuarioValidar(usuarioDTO)).rejects.toThrow("Endereço é obrigatorio");
    });
  });
});
