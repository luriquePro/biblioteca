import { CadastrarUsuarioUseCase } from './application/CadastrarUsuario/CadastrarUsuario.usecase';

const CadastrarUsuarioUseCaseInstance = new CadastrarUsuarioUseCase();

CadastrarUsuarioUseCaseInstance.handle({
  nomeCompleto: 'Joaquim',
  cpf: '123',
  telefone: '123',
  email: '123',
  dataNascimento: new Date('2004-01-01'),
  endereco: '123'
}).then((response) => {
  console.log(response);
});
