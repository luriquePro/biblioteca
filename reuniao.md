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
[X] Buscar um usuário por CPF
[X] - Retornar um usuário ou Vazio
[] - Criar Rota e Controller

[X] - Cadastrar Genero de Livros
[X] - Genero deve ser um campo Unico

[X] - Listar Genero de Livros

[] - Criar Entidade e repositorio de Genero no Mongo
[] - Criar Rota e Controller de Genero

[X] - Cadastrar Autor de Livros
[X] - Autor deve ser um campo unico

[X] - Listar Autores de Livros

[] - Criar Entidade e repositorio de Autor no Mongo
[] - Criar Rota e Controller de Autor

[X] - Cadastrar Editora de Livros
[X] - Editora deve ser um campo Unico

[X] - Listar Editoras de Livros

[] - Criar Entidade e repositorio de Editora no Mongo
[] - Criar Rota e Controller de Editora

[X] Cadastrar um novo livro
[X] - ISBN deve ser único
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

[] - Adicionar Status em todos os livros
[] - Status vai ser uma string. ("ATIVO", "DELETADO")
[] - Criar padrão de deletar dados (DeletedAt + status "DELETADO")
[] - Criar Update de todas as entidades
[] - Criar Delete de todas as entidades

## Estruturas
