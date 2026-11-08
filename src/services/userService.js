const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const loginUser = async (email, password) => {
    // 1. Buscar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // 2. Comparar la contraseña ingresada con la encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    // 3. Generar el token JWT (dura 2 horas)
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return { token, user: { id: user._id, nombre: user.nombre, email: user.email } };
};

module.exports = {
    createUser,
    findUserByEmail,
    loginUser
};