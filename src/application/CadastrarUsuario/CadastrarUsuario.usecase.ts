import { GerarId } from '../../common/GerarId';
import { ICadastrarUsuarioDTO, ICadastrarUsuarioReturnDTO } from './CadastrarUsuario.interfaces';

class CadastrarUsuarioUseCase {
  constructor() {}

  public async handle({
    nomeCompleto,
    cpf,
    telefone,
    email,
    dataNascimento,
    endereco
  }: ICadastrarUsuarioDTO): Promise<ICadastrarUsuarioReturnDTO> {
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

    // await usuarioRepositorio.cadastrar(dadosDoUsuario);

    return dadosDoUsuario;
  }
}

export { CadastrarUsuarioUseCase };
