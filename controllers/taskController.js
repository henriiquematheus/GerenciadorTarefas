const Task = require('../models/task');
const List = require('../models/list');

const createTask = async (req, res) => {
    try {
        console.log('Lista ID recebido na requisição:', req.body.list)
        // Find the list
        const list = await List.findOne({
            _id: req.body.list,
            owner: req.user._id,
        });
 
        // Check if the list exists
        if (!list) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }
 
        // Create the task
        const task = new Task({
            ...req.body,
            owner: req.user._id,
            list: req.body.list,
        });
 
        await task.save();
        res.status(201).json({ task, message: 'Tarefa criada com sucesso' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
 };

 const getTasksByList = async (req, res) => {
    const listId = req.params.id;

    try {
        const tasks = await Task.find({
            owner: req.user._id,
            list: listId,
        });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'Não foram encontradas tarefas para esta lista' });
        }

        res.status(200).json({ tasks, count: tasks.length, message: 'Sucesso ao listar tarefas por lista' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            owner: req.user._id,
            list: req.query.list,
        });
        res.status(200).json({
            tasks,
            count: tasks.length,
            message: 'Sucesso ao listar tarefas',
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
 };
 

const getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id,
        });
        if (!task) {
            return res.status(404).json({ message: 'Não foi encontrada' });
        }
        res.status(200).json({ task, message: 'Sucesso ao listar tarefa' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateTaskById = async (req, res) => {
    const taskId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['descricao', 'completada'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalido' });
    }

    try {
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: 'Não encontrada' });
        }

        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();

        res.json({
            message: 'Tarefa atualizada com sucesso',
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const deleteTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findOneAndDelete({
            _id: taskId,
            owner: req.user._id,
        });
        if (!task) {
            return res.status(404).json({ message: 'Não encontrada' });
        }
        res
            .status(200)
            .json({ task, message: 'Tarefa deletada com sucesso' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createList = async (req, res) => {
    try {
        const list = new List({
            ...req.body,
            owner: req.user._id,
        });
        await list.save();
        res.status(201).json({ list, message: 'Lista criada com sucesso' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
 };

 
 const deleteList = async (req, res) => {
    const listId = req.params.id;
 
    try {
        const list = await List.findOneAndDelete({
            _id: listId,
            owner: req.user._id,
        });
        if (!list) {
            return res.status(404).json({ message: 'Não encontrada' });
        }
        res
            .status(200)
            .json({ list, message: 'Lista deletada com sucesso' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
 };

 const getListById = async (req, res) => {
    const listId = req.params.id;
 
    try {
        const list = await List.findOne({
            _id: listId,
            owner: req.user._id,
        });
        if (!list) {
            return res.status(404).json({ message: 'Não encontrada' });
        }
        res.status(200).json({ list, message: 'Sucesso ao listar lista' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
 }

 const updateListById = async (req, res) => {
    const listId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
 
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalido' });
    }
 
    try {
        const list = await List.findOne({
            _id: listId,
            owner: req.user._id,
        });
 
        if (!list) {
            return res.status(404).json({ message: 'Não encontrada' });
        }
 
        updates.forEach((update) => (list[update] = req.body[update]));
        await list.save();
 
        res.json({
            message: 'Lista atualizada com sucesso',
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
 }

 const getList = async (req, res) => {
    try {
        const lists = await List.find({
            owner: req.user._id,
        });
        res.status(200).json({
            lists,
            count: lists.length,
            message: 'Sucesso ao listar listas',
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
 }

 
 module.exports = {
    createTask,
    getUserTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    createList,
    deleteList,
    getListById,
    updateListById,
    getList,
    getTasksByList,
 };