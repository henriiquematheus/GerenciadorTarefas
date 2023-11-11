const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.get('/test', auth, (req, res) => {
    res.json({
        message: 'As rotas de usuários estão funcionando!',
        user: req.user,
    });
});



// criar user
router.post('/', userController.createUser);

// login user
router.post('/login', userController.loginUser);

// logout
router.delete('/logout', auth, userController.logoutUser);

// logout todos
router.delete('/logoutAll', auth, userController.logoutAllDevices);

module.exports = router;
