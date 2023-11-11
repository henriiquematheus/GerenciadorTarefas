# GerenciadorTarefas

## Documentação da API

### Endpoints:

Usuários:

POST /users - Criar um novo usuário.

POST /users/login - Fazer login.

POST /users/logout - Fazer logout.

POST /users/logoutAll - Fazer logout de todos os dispositivos.

Tarefas:

POST /tasks - Criar uma nova tarefa.

GET /tasks - Obter todas as tarefas do usuário autenticado.

GET /tasks/:id - Obter uma tarefa específica.

PUT /tasks/:id - Atualizar uma tarefa.

DELETE /tasks/:id - Excluir uma tarefa.


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGO_URL=mongodb+srv://user:user@cluster0.1mwomxe.mongodb.net/`

`DB_NAME=Cluster0`

`JWT_SECRET_KEY=123`

`PORT=8000`

## Demonstração

Crie um user:

```json
{
    "name": "user123",
    "email": "usuario@email.com",
    "password": "senha123"
}
```
```json
Crie uma task:
{
    "descricao": "Descrição da Tarefa",
    "completada": false
}
```



