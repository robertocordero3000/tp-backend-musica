# TP Final Backend - API Plataforma de Clases de Música

API RESTful para gestionar el catálogo de una plataforma de clases de música (servicios/clases, categorías y usuarios) desarrollada con Node.js, Express y MongoDB bajo arquitectura MVC y Capa de Servicios.

---

##  USUARIO ADMIN DE PRUEBA
- **email:** `admin@musica.com`
- **password:** `admin123`

---

##  TECNOLOGÍAS
- Node.js
- Express
- MongoDB (Mongoose) y atlas
- dotenv
- cors
- bcrypt
- Vercel
- jsonwebtoken (JWT)

---

##  ESQUEMA DE LA BASE DE DATOS (COLLECTIONS)

### 1. `users` (Usuarios / Registros de Alumnos)
```json
{
  "_id": "ObjectId",
  "nombre": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required, hashed con bcrypt)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
2. categories (Categorías de Clases)
JSON
{
  "_id": "ObjectId",
  "nombre": "String (required)",
  "descripcion": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
3. products (Clases / Cursos de Música)
Nota: Se mantiene el nombre de la entidad products y sus campos clave requeridos por la consigna (precio y stock), adaptando su significado al arancel mensual de la clase y al cupo de vacantes disponibles.

JSON
{
  "_id": "ObjectId",
  "nombre": "String (required) - Nombre de la clase/curso",
  "descripcion": "String - Detalle de modalidad y contenidos",
  "precio": "Number (required) - Arancel / Valor de la clase",
  "stock": "Number (required) - Cupo / Vacantes disponibles",
  "categoria": "ObjectId (ref: 'Category', required)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
  .env (Variables de entorno)
Fragmento de código
PORT = 5000
MONGO_URI = mongodb+srv://...
JWT_SECRET = clave_secreta_jwt
   INSTALACIÓN Y EJECUCIÓN
Instalar dependencias:

Bash
npm install
Configurar variables de entorno:

Bash
cp .env.example .env
Levantar servidor:

Bash
node app.js
RUTAS / ENDPOINTS DE LA API Y EJEMPLOS MOCK
 AUTH (/api/users)
POST /api/users/register - Registro de usuario / alumno

Body JSON (Request):

JSON
{
  "nombre": "Roberto Cordero",
  "email": "roberto@ejemplo.com",
  "password": "miPassword123"
}
Response (201 Created):

JSON
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "nombre": "Roberto Cordero",
    "email": "roberto@ejemplo.com"
  }
}
POST /api/users/login - Login (devuelve Token JWT)

Body JSON (Request):

JSON
{
  "email": "admin@musica.com",
  "password": "admin123"
}
Response (200 OK):

JSON
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
📂 CATEGORÍAS (/api/categories)
GET /api/categories - Obtener todas las categorías (Público)

POST /api/categories - Crear categoría (Protegido con JWT)

Body JSON (Request):

JSON
{
  "nombre": "Clases de Guitarra",
  "descripcion": "Cursos presenciales y virtuales de guitarra criolla, acústica y eléctrica."
}
DELETE /api/categories/:id - Eliminar categoría (Protegido con JWT)

📦 CLASES Y CURSOS (/api/products)
GET /api/products - Obtener clases con categoría vinculada (populate)

Response (200 OK):

JSON
[
  {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d3",
    "nombre": "Clase Individual de Guitarra",
    "descripcion": "Clase de 1 hora semanal adaptada al nivel del alumno. Presencial o virtual.",
    "precio": 15000,
    "stock": 10,
    "categoria": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
      "nombre": "Clases de Guitarra",
      "descripcion": "Cursos presenciales y virtuales de guitarra criolla, acústica y eléctrica."
    }
  }
]
GET /api/products/:id - Obtener clase por ID (Público)

POST /api/products - Crear nueva clase/curso (Protegido con JWT)

Body JSON (Request):

JSON
{
  "nombre": "Curso de Piano y Teclado",
  "descripcion": "Técnica, lectura de partituras y repertorio popular.",
  "precio": 18000,
  "stock": 5,
  "categoria": "65f1a2b3c4d5e6f7a8b9c0d2"
}
PUT /api/products/:id - Modificar clase/curso (Protegido con JWT)

DELETE /api/products/:id - Eliminar clase/curso (Protegido con JWT)



---

##  FUNCIONALIDADES IMPLEMENTADAS Y A FUTURO

###  Funcionalidades Implementadas
- Arquitectura MVC con Capa de Servicios (`services/`)[cite: 2, 5].
- CRUD completo para Clases/Productos y Categorías con `populate`[cite: 3, 5].
- Registro y Login de Usuarios con encriptación de contraseñas (`bcrypt`) y autenticación basada en JWT[cite: 3, 5].
- Configuración de variables de entorno con `dotenv` y habilitación de `cors`.

###  Funcionalidades a Futuro
- **Panel de Administración (Dashboard):** Interfaz gráfica para que los profesores gestionen clases, aranceles y cupos en tiempo real.
- **Módulo de Reservas y Pagos:** Integración con pasarelas de pago (Mercado Pago) para la inscripción directa a las clases.
- **Sistema de Roles:** Manejo granular de permisos diferenciando alumnos, profesores y administradores.
- **Recuperación de Contraseñas:** Envío de correos electrónicos con tokens temporales de restablecimiento.

 SEGURIDAD Y REGLAS DE NEGOCIO
Contraseñas encriptadas con bcrypt en la base de datos (mediante un pre-save hook).

Rutas de creación, edición y borrado protegidas mediante el encabezado Authorization: Bearer <token>.

Relación de Clases (products) y Categorías resuelta con ObjectId y populate de Mongoose.