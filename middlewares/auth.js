const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('Token recebido:', token); // Adicionando log para o token recebido
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Token decodificado:', decoded); // Adicionando log para o token decodificado
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        });

        if (!user) {
            throw new Error('Não foi possível logar');
        }

        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        console.error('Erro de autenticação:', error); // Adicionando log para erros de autenticação
        res.status(401).send({ error: error.message });
    }
}

module.exports = auth;