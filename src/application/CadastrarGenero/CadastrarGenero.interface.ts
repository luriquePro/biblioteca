export interface IGeneroDTO {
  id: string;
  genero: string;
}

export interface ICadastrarGeneroDTO {
  genero: string;
}

export interface IGeneroRepositorio {
  cadastrar: (dadosDoGenero: IGeneroDTO) => Promise<void>;
}
