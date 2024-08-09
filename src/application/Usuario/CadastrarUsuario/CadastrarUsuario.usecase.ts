import { GerarId } from "../../../common/GerarId";
import { BadRequestError } from "../../../shared/errors/AppError";
import { IUsuarioRepositorio } from "../Usuario.interfaces";
import { ICadastrarUsuarioDTO, ICadastrarUsuarioReturnDTO } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioValidar } from "./CadastrarUsuario.validar";

class CadastrarUsuarioUseCase {
  constructor(private readonly UsuariosRepositorio: IUsuarioRepositorio) {}

  public async handle({ nomeCompleto, cpf, telefone, email, dataNascimento, endereco }: ICadastrarUsuarioDTO): Promise<void> {
    CadastrarUsuarioValidar({ nomeCompleto, cpf, telefone, email, dataNascimento, endereco });

    const [usuarioCadastradoComEmail, usuarioCadastradoComCpf, usuarioCadastradoComTelefone] = await Promise.all([
      this.UsuariosRepositorio.buscarUsuario({ email }),
      this.UsuariosRepositorio.buscarUsuario({ cpf }),
      this.UsuariosRepositorio.buscarUsuario({ telefone })
    ]);

    if (usuarioCadastradoComEmail) {
      throw new BadRequestError("Email já cadastrado");
    }

    if (usuarioCadastradoComCpf) {
      throw new BadRequestError("CPF já cadastrado");
    }

    if (usuarioCadastradoComTelefone) {
      throw new BadRequestError("Telefone já cadastrado");
    }

    const dadosDoUsuario: ICadastrarUsuarioReturnDTO = {
      id: GerarId(),
      nome_completo: nomeCompleto,
      cpf,
      telefone,
      endereco,
      email,
      data_nascimento: dataNascimento,
      data_cadastro: new Date()
    };

    await this.UsuariosRepositorio.cadastrar(dadosDoUsuario);
  }
}

export { CadastrarUsuarioUseCase };
