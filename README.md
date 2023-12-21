# Task Manager
RESTful API for a task manager

## API Documentation

### Endpoints:

Users:

GET /users - List all users.
POST /users - Create a new user.
POST /users/login - Log in.
POST /users/logout - Log out.
POST /users/logoutAll - Log out from all devices.
Tasks:

POST /tasks - Create a new task.
GET /tasks - Get all tasks from the authenticated user.
GET /tasks/:id - Get a specific task.
PUT /tasks/:id - Update a task.
DELETE /tasks/:id - Delete a task.


## Environment Variables

To run this project, you'll need to add the following environment variables to your .env file:

`MONGO_URL=`

`DB_NAME=`

`JWT_SECRET_KEY=`

`PORT=`

## Demo

Create a user:

```json
{
    "name": "user001",
    "email": "usuario1@email.com",
    "password": "123456"
}
```
Login:

```json
{
    "email": "usuario1@email.com",
    "password": "123456"
}

```
Retrieve the generated Bearer token and then:

Create a task:

```json

{
    "descricao": "Descrição qualquer",
    "completada": false
}
```



