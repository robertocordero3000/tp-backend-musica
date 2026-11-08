const userService = require('../services/userService');

const registerUser = async (req, res) => {
  
  console.log('1. LLEGÓ AL CONTROLLER');

  try {
    console.log('2. DATOS RECIBIDOS:', req.body);

    const newUser = await userService.createUser(req.body);

    console.log('3. USUARIO GUARDADO');

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: newUser
    });

  } catch (error) {
    console.error('ERROR AL REGISTRAR:', error);

    res.status(400).json({
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({ message: 'Inicio de sesión exitoso', ...result });
  } catch (error) {
    res.status(401).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};