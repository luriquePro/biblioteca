const GerarId = require('../common/GerarId.common');

const cadastrarUsuario = async () => {
  return async ({ nomeCompleto, cpf, telefone, endereco, email, dataNascimento }) => {
    const dadosDoUsuario = {
      id: GerarId(),
      nome_completo: nomeCompleto,
      cpf,
      telefone,
      endereco,
      email,
      data_nascimento: dataNascimento,
      data_cadastro: new Date()
    };

    await usuarioRepositorio.cadastrar(dadosDoUsuario);

    return dadosDoUsuario;
  };
};

module.exports = cadastrarUsuario;
