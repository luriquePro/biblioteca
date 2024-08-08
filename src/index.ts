// Gerar Conexão do banco
import mongoose from "mongoose";
import { UsuarioRepositorioMongo } from "./repository/mongo/UsersRepositoryMongo";
import { CadastrarUsuarioUseCase } from "./application/CadastrarUsuario/CadastrarUsuario.usecase";
import { BuscarUsuarioUseCase } from "./application/BuscarUsuario/BuscarUsuario.usecase";

mongoose.connect("mongodb://localhost:27017", { dbName: "biblioteca" }).then(() => console.log("Mongodb Conectado"));

const RepositorioDoUsuario = new UsuarioRepositorioMongo();
// const cadastrarUsuarioUseCase = new CadastrarUsuarioUseCase(RepositorioDoUsuario).handle.bind(
//   new CadastrarUsuarioUseCase(RepositorioDoUsuario)
// );

// cadastrarUsuarioUseCase({
//   nomeCompleto: "nome_valido",
//   cpf: "09984019004",
//   telefone: "70140108084",
//   email: "email_valido1@email.com",
//   dataNascimento: new Date("2004-01-01"),
//   endereco: "endereco_valido"
// });

const buscarUsuarioUseCase = new BuscarUsuarioUseCase(RepositorioDoUsuario).handle.bind(new BuscarUsuarioUseCase(RepositorioDoUsuario));
(async () => {
  const usuarioPorCPF = await buscarUsuarioUseCase({ cpf: "09984019004" });
  const usuarioPorEmail = await buscarUsuarioUseCase({ email: "email_valido1@email.com" });
  const usuarioPorTelefone = await buscarUsuarioUseCase({ telefone: "70140108084" });
  const usuarioPorId = await buscarUsuarioUseCase({ id: "972aaf90-052a-47bc-8d79-cf70202956db" });

  console.log({ usuarioPorCPF, usuarioPorEmail, usuarioPorTelefone, usuarioPorId });
})();
