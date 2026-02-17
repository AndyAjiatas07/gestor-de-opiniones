# gestor-de-opiniones

📘 OpinaNet API

API REST para la gestión de usuarios, publicaciones y comentarios.

🚀 Base URL
http://localhost:3001/OpinaNetAdmin/v1

🔐 Autenticación

Los endpoints protegidos requieren token JWT.

Header requerido:

Authorization: Bearer TU_TOKEN


Obtén el token al iniciar sesión.

👤 USERS
📝 Registrar usuario

POST /users/register

Body
{
  "username": "andy",
  "email": "andy@email.com",
  "password": "123456"
}

🔑 Iniciar sesión

POST /users/login

Body
{
  "identifier": "andy@email.com",
  "password": "123456"
}


📌 Devuelve un token JWT.

🙍 Obtener mi perfil

GET /users/me 🔒

Devuelve los datos esenciales del usuario autenticado.

✏️ Actualizar perfil

PUT /users/profile 🔒

Body (opcional)
{
  "username": "nuevo_nombre"
}

📝 POSTS
➕ Crear publicación

POST /posts 🔒

Body
{
  "title": "Mi primer post",
  "category": "Tecnologia",
  "content": "Este es mi contenido"
}

✏️ Actualizar publicación

PUT /posts/{idPost} 🔒

Body
{
  "title": "Nuevo título"
}

🗑️ Eliminar publicación

DELETE /posts/{idPost} 🔒

👤 Ver publicaciones de un usuario

GET /posts/user/{idUser}

📄 Ver mis publicaciones

GET /posts/me 🔒

🌍 Ver todas las publicaciones

GET /posts

💬 COMMENTS
➕ Crear comentario

POST /comments 🔒

Body
{
  "content": "Excelente publicación!",
  "postId": "ID_DEL_POST"
}

✏️ Actualizar comentario

PUT /comments/{idComment} 🔒

Body
{
  "content": "Comentario editado"
}

🗑️ Eliminar comentario

DELETE /comments/{idComment} 🔒

📄 Ver comentarios de una publicación

GET /comments/post/{idPost}

👤 Ver mis comentarios

GET /comments/me 🔒

❤️ HEALTH CHECK
Verificar estado del servidor

GET /health

Devuelve estado del API.

📦 Tecnologías

Node.js

Express

MongoDB

Mongoose

JWT Authentication

Express Validator

⚙️ Instalación
npm install

▶️ Ejecutar proyecto
npm run dev

🔐 Variables de entorno (.env)
PORT=3001
MONGO_URI=tu_conexion
JWT_SECRET=tu_secreto


⚠️ Nunca subas el archivo .env al repositorio.

👨‍💻 Autor

Proyecto académico desarrollado por Andy Ariel Ajiatas Xiquin