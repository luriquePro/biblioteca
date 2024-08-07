export interface ICadastrarUsuarioDTO {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: string;
  email: string;
  dataNascimento: Date;
}

export interface ICadastrarUsuarioReturnDTO {
  id: string;
  nome_completo: string;
  cpf: string;
  telefone: string;
  endereco: string;
  email: string;
  data_nascimento: Date;
  data_cadastro: Date;
}

export interface IUsuarioRepositorio {
  cadastrar: (dadosDoUsuario: ICadastrarUsuarioReturnDTO) => Promise<void>;
}
