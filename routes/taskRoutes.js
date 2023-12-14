//Routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

router.get('/test', auth, (req, res) => {
    res.json({
        message: 'As rotas de tarefas estão funcionando!',
        user: req.user,
    });
});


// criar task
router.post('/', auth, taskController.createTask);

// listar tasks
router.get('/', auth, taskController.getUserTasks);

// listar por id
router.get('/:id', auth, taskController.getTaskById);

// atualizar por id
router.put('/:id', auth, taskController.updateTaskById);

// delete por id
router.delete('/:id', auth, taskController.deleteTaskById);



module.exports = router;