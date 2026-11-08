const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');

const categoryRoutes = require('./src/routes/categoryRoute');
const productRoutes = require('./src/routes/productRoute');
const userRoutes = require('./src/routes/userRoute');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// PRUEBA TEMPORAL
app.use((req, res, next) => {
  console.log('PETICIÓN RECIBIDA:', req.method, req.url);
  next();
});

// Conexión a la base de datos
connectDB();

// Rutas API
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API RESTful de Clases de Música funcionando correctamente');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;