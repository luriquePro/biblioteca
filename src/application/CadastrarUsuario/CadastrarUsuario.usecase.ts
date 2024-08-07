import { GerarId } from "../../common/GerarId";
import { ICadastrarUsuarioDTO, ICadastrarUsuarioReturnDTO, IUsuarioRepositorio } from "./CadastrarUsuario.interfaces";
import { CadastrarUsuarioValidar } from "./CadastrarUsuario.validar";

class CadastrarUsuarioUseCase {
  constructor(private readonly UsuariosRepositorio: IUsuarioRepositorio) {}

  public async handle({ nomeCompleto, cpf, telefone, email, dataNascimento, endereco }: ICadastrarUsuarioDTO): Promise<void> {
    CadastrarUsuarioValidar({ nomeCompleto, cpf, telefone, email, dataNascimento, endereco });

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

    this.UsuariosRepositorio.cadastrar(dadosDoUsuario);
  }
}

export { CadastrarUsuarioUseCase };
