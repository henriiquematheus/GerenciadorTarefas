const Task = require('../models/task');

const createTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id,
        });
        await task.save();
        res.status(201).json({ task, message: 'Tarefa criada com sucesso' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            owner: req.user._id,
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

module.exports = {
    createTask,
    getUserTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
};
