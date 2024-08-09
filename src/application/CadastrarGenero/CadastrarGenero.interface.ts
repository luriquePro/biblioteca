export interface IGeneroDTO {
  id: string;
  genero: string;
}

export interface ICadastrarGeneroDTO {
  genero: string;
}

export interface IGeneroFiltroDTO {
  genero?: string;
}

export interface IGeneroRepositorio {
  cadastrar: (dadosDoGenero: IGeneroDTO) => Promise<void>;
  buscarGenero: (filtro: IGeneroFiltroDTO) => Promise<IGeneroDTO | null>;
}
