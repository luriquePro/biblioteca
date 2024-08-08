import { CadastrarUsuarioUseCase } from "./application/CadastrarUsuario/CadastrarUsuario.usecase";
import { UsuarioRepositorioMemoria } from "./repository/memory/UsersRepositoryMemory";

const usuarioRepositorioMemoria = new UsuarioRepositorioMemoria();
const CadastrarUsuarioUseCaseInstance = new CadastrarUsuarioUseCase(usuarioRepositorioMemoria);
