const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ user, message: 'Usuário criado com Sucesso' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token, message: 'Logado com sucesso' });
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).json({ message: 'Foi deslogado' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const logoutAllDevices = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json({ message: 'Deslogado em todos' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    logoutAllDevices,
};
