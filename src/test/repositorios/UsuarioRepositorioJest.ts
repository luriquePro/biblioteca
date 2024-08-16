import { IUsuarioRepositorio } from "../../usecases/Usuario/Usuario.interfaces";

export const UsuariosRepositorioJest: IUsuarioRepositorio = {
  cadastrar: jest.fn(),
  buscarUsuario: jest.fn(),
  buscarUsuarios: jest.fn(),
  listar: jest.fn().mockReturnValue([])
};
