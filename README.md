TP Final Backend - Plataforma de Música
API RESTful para gestionar el catálogo de una plataforma de música (productos, categorías y usuarios) desarrollada con arquitectura MVC y capa de servicios.

USUARIO ADMIN DE PRUEBA
email: admin@musica.com
password: admin123

TECNOLOGIAS
Node.js - Express - MongoDB (Mongoose) - dotenv - cors - bcrypt - jsonwebtoken (JWT)

.env (Variables de entorno)
PORT = 5000
MONGO_URI = mongodb+srv://...
JWT_SECRET = clave_secreta_jwt

INSTALACION Y EJECUCION
npm install (instala dependencias)

cp .env.example .env (configurar variables de entorno)

node app.js (levantar servidor)

RUTAS / ENDPOINTS DE LA API
AUTH (/api/users)

POST /api/users/register - Registro de usuario

POST /api/users/login - Login (devuelve Token JWT)

CATEGORIAS (/api/categories)

GET /api/categories - Obtener todas las categorías (Público)

POST /api/categories - Crear categoría (Protegido con JWT)

DELETE /api/categories/:id - Eliminar categoría (Protegido con JWT)

PRODUCTOS (/api/products)

GET /api/products - Obtener productos con categoría vinculada (populate)

GET /api/products/:id - Obtener producto por ID (Público)

POST /api/products - Crear producto (Protegido con JWT)

PUT /api/products/:id - Modificar producto (Protegido con JWT)

DELETE /api/products/:id - Eliminar producto (Protegido con JWT)

SEGURIDAD Y REGLAS DE NEGOCIO
Contraseñas encriptadas con bcrypt en la base de datos.

Rutas de creación, edición y borrado protegidas mediante el encabezado Authorization: Bearer .

Relación de Productos y Categorías resuelta con ObjectId y populate de Mongoose.