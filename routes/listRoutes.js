//Routes/listRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

router.get('/test', auth, (req, res) => {
    res.json({
        message: 'As rotas de listas estão funcionando!',
        user: req.user,
    });
});
// criar lista
router.post('/', auth, taskController.createList);

// listar listas
router.get('/', taskController.getList);

// listar por id
router.get('/:id', auth, taskController.getListById);

// atualizar por id
router.put('/:id', auth, taskController.updateListById);

// delete por id
router.delete('/:id', taskController.deleteList);

// listar tasks por lista
router.get('/task/:id', auth, taskController.getTasksByList);

module.exports = router;

