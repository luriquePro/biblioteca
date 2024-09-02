export interface IDadosDeEnvioDoEmail {
  conteudo: string;
  titulo: string;
  recepitor: string;
}

export interface IEnviarEmailDTO {
  to: string;
  subject: string;
  html: string;
}
