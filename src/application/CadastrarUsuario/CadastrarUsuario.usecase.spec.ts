import { ICadastrarUsuarioDTO, IUsuarioRepositorio } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioUseCase } from "./CadastrarUsuario.usecase";

describe("cadastrar Usuário Casos de Uso", () => {
    const UsuariosRepositorio: IUsuarioRepositorio = {
        cadastrar: jest.fn(),
        buscarUsuario: jest.fn()
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

    // test("Deve-se dar erro ao cadastrar usuario com email já existente", async () => {
    //     const usuarioDTO: ICadastrarUsuarioDTO = {
    //         nomeCompleto: "nome_valido",
    //         cpf: "71079969403",
    //         telefone: "81999999999",
    //         email: "email_ja_existente@email.com",
    //         dataNascimento: new Date("2004-01-01"),
    //         endereco: "endereco_valido"
    //     };

    //     const sut = new CadastrarUsuarioUseCase(UsuariosRepositorio).handle;
    //     await expect(() => sut(usuarioDTO)).rejects.toThrow("Email já cadastrado");
    // });

    // Telefone Unico

    // CPF unico
});
