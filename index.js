// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const startApolloServer = require('./graphqlServer');

// Importe seus modelos e controladores aqui
const User = require('./models/user');
const Task = require('./models/task');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');

// Importe suas rotas
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  const { server, app } = await startApolloServer();

  app.use(bodyParser.json());

  // Use suas rotas
  app.use('/users', userRoutes);
  app.use('/tasks', taskRoutes);

  app.get('/', (req, res) => {
    res.json({
      message: 'API de tarefas funcionando!',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}.`);
  });
};

startServer();
