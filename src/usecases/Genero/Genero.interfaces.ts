import { IGeneroDTO } from "../../types/Genero.types";

export interface IGeneroRepositorio {
  cadastrar: (dadosDoGenero: IGeneroDTO) => Promise<void>;
  buscarGenero: (filtro: IGeneroFiltroDTO) => Promise<IGeneroDTO | null>;
  listarGeneros: () => Promise<IGeneroDTO[]>;
}

export interface IGeneroFiltroDTO {
  genero?: string;
}
