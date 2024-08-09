import { IAutorDTO } from "../../types/Autor.types";

export interface IAutorRepositorio {
  listarAutores: () => Promise<IAutorDTO[]>;
}
