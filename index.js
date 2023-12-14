const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const startApolloServer = require('./graphqlserver');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');
const Task = require('./models/task');
const List = require('./models/list');
const auth = require('./middlewares/auth');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Permitir acesso a partir deste URL específico
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/lists', listRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API de tarefas funcionando!',
  });
});

mongoose.connect(MONGO_URL, {
  dbName: DB_NAME,
}).then(
  () => {
    console.log('Conectado ao banco de dados');
    app.listen(PORT, () => {
      console.log(`Server rodando na porta ${PORT}.`);
    });
  }
).catch((err) => {
  console.log('Error connecting to the database ' + err);
});
