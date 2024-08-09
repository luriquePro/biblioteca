## Reunião

> Somos uma biblioteca pequena e gostariamos de controlar a nossa entrada e saída de livros.
> Queremos cadastrar o usuário
> Queremos cadastrar os livros
> Gostariamos de Poder emprestar os livros pra Usuários
> Gostariamos de listar os livros emprestados

## Dados

- Usuário: [nome_completo, CPF, telefone, endereco, email, data_cadastro, data_nascimento]
- Livro: [nome, quantidade, autor, genero, ISBN, data_cadastro]
- Emprestíomo: [usuario_id, livro_id, data_retorno, data_devolucao, data_saida]

## UseCases

[X] Cadastrar um novo usuário
[X] - Validar Os Campos
[X] - CPF deve ser um campo único
[X] - Telefone deve ser um campo único
[X] - Email devem ser únicos
[X] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[X] Buscar um usuário por CPF
[X] - Retornar um usuário ou Vazio
[] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[] Cadastrar um novo livro
[] - ISBN deve ser único
[] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[] Buscar livro por nome ou ISBN
[] - Retornar livros ou Vazio
[] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[] Emprestar um livro ao usuario
[] - A data de retorno não pode ser menor que a data de saída
[] - Um usuário não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo
[] - Um usuário pode ter mais de um livro com ISBN diferentes
[] - Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e data de retorno
[] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[] Devolver livro
[] - Caso usuário atrase, será gerado uma multa fixa de R$ 10,00 + R$ 1,50 /dia
[] - Enviar um email a cada 10 dias informando o valor da multa
[] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[] Data próxima a devolução
[] - Quando estiver faltando 2 dias enviar um email informando a devolução
[] - Quando estiver no dia da devolução, enviar um email informando
[] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[] Listar emprestimos
[] - Mostrar todos os empréstimos pendentes, com nome do livro, usuário, cpf, data de saída e data de retorno.
[] - Ordernar por data de retorno mais antiga (Livro mais atrasado)
[] - Criar Entidade e repositorio Mongo
[] - Criar Rota e Controller

[] - Adicionar DOTENV

## Estruturas
