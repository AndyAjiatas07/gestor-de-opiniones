gestor-de-opiniones-backend
📘 OpinaNet API

API REST para la gestión de usuarios, publicaciones y comentarios.

📂Estructura inicial del Proyecto

Crea una carpeta (puede ser "OpinaNet").

Clona los repositorios dentro de ella:

Backend:

git clone https://github.com/AndyAjiatas07/gestor-de-opiniones-backend

Frontend:

git clone https://github.com/AndyAjiatas07/gestor-de-opiniones-frontend

La estructura final será:

OpinaNet/
├── gestor-de-opiniones-backend/
└── gestor-de-opiniones-frontend/

🖥️ Ejecución del proyecto (Backend + Frontend)

El proyecto está dividido en dos partes:

Backend → API REST (Node.js + Express + MongoDB)

Frontend → Aplicación React (Vite)

Ambos deben ejecutarse por separado.

0️⃣Crea un archivo .env en la raiz del proyecto de gestor-de-opiniones-backend con:

.env

PORT=3001
NODE_ENV=development
URL_MONGODB=mongodb://localhost:27017/OpinaNet
JWT_SECRET=supersecret_academico
JWT_EXPIRES=4h

1️⃣ Ejecutar Backend

Ubícate en la carpeta del servidor:

cd gestor-de-opiniones-backend

Instala dependencias:

npm install

Inicia el servidor:

npm run dev

Disponible en:

http://localhost:3001/OpinaNetAdmin/v1

2️⃣ Ejecutar Frontend

En otra terminal:

cd gestor-de-opiniones-frontend

Instala dependencias:

npm install

Ejecuta la aplicación:

npm run dev

Disponible en:

http://localhost:5173
🔄 ¿Qué implica ejecutar ambos?

El frontend consume la API del backend.

El backend debe estar activo para:

Autenticación

Crear publicaciones

Crear comentarios

Editar o eliminar contenido

Si el backend no está corriendo, el frontend mostrará errores 400, 404 o 500.

🛑 Requisitos previos

Node.js instalado

MongoDB activo (local o Atlas)

📦 Tecnologías

Node.js

Express

MongoDB

Mongoose

JWT Authentication

Express Validator

React (Frontend)

Vite

🚀 Base URL
http://localhost:3001/OpinaNetAdmin/v1
🔐 Autenticación

Los endpoints protegidos requieren token JWT.

Header requerido:

Authorization: Bearer TU_TOKEN

El token se obtiene al iniciar sesión.


👤 USERS
📝 Registrar usuario

POST /users/register

Body:

{
  "username": "andy",
  "email": "andy@email.com",
  "password": "123456"
}
🔑 Iniciar sesión

POST /users/login

Body:

{
  "identifier": "andy@email.com",
  "password": "123456"
}

Devuelve un token JWT.

🙍 Obtener mi perfil 🔒

GET /users/me

Devuelve los datos del usuario autenticado.

✏️ Actualizar perfil 🔒

PUT /users/profile

Body opcional:

{
  "username": "nuevo_nombre"
}

🙍 Obtener todos los usuarios 🔒

GET /users


📝 POSTS
➕ Crear publicación 🔒

POST /posts

{
  "title": "Mi primer post",
  "category": "Tecnologia",
  "content": "Este es mi contenido"
}
✏️ Actualizar publicación 🔒

PUT /posts/{idPost}

{
  "title": "Nuevo título"
}
🗑️ Eliminar publicación 🔒

DELETE /posts/{idPost}

👤 Ver publicaciones de un usuario

GET /posts/user/{idUser}

📄 Ver mis publicaciones 🔒

GET /posts/me

🌍 Ver todas las publicaciones

GET /posts

📄 Ver una publicación por id

GET /posts/{idPost}


💬 COMMENTS
➕ Crear comentario 🔒

POST /comments

{
  "content": "Excelente publicación!",
  "postId": "ID_DEL_POST"
}
✏️ Actualizar comentario 🔒

PUT /comments/{idComment}

{
  "content": "Comentario editado"
}
🗑️ Eliminar comentario 🔒

DELETE /comments/{idComment}

📄 Ver comentarios de una publicación

GET /comments/post/{idPost}

👤 Ver mis comentarios 🔒

GET /comments/me

📄 Ver comentario por id 🔒

GET /comments/{idComment}

❤️ HEALTH CHECK
Verificar estado del servidor

GET /health

Devuelve el estado del API.

👨‍💻 Autor

Proyecto académico desarrollado por Andy Ariel Ajiatas Xiquin - 2021496