import { IAutorDTO } from "../../types/Autor.types";
import { ICadastrarAutorDTO } from "./CadastrarAutor/CadastrarAutor.interfaces";

export interface IAutorRepositorio {
  listarAutores: () => Promise<IAutorDTO[]>;
  cadastrar: (dadosDoAutor: ICadastrarAutorDTO) => Promise<IAutorDTO>;
  buscarAutor: (filter: IAutorFiltroDTO) => Promise<IAutorDTO | null>;
}

export interface IAutorFiltroDTO {
  autor?: string;
}
