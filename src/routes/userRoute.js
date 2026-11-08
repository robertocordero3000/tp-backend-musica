const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', (req, res, next) => {
    console.log('LLEGÓ A LA RUTA REGISTER');
    next();
}, userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;