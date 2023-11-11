const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'API de tarefas funcionando!'
    });
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}.`);
});
