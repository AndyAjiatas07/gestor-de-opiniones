import api from "./axios";

// Obtener comentarios por post
export const getCommentsByPostRequest = (postId) => {
  return api.get(`/comments/post/${postId}`);
};

// 🔥 OBTENER comentario por ID (esto faltaba)
export const getCommentByIdRequest = (id) => {
  return api.get(`/comments/${id}`);
};

// Crear comentario
export const createCommentRequest = (data) => {
  return api.post("/comments", data);
};

// Actualizar comentario
export const updateCommentRequest = (id, data) => {
  return api.put(`/comments/${id}`, data);
};

// Eliminar comentario
export const deleteCommentRequest = (id) => {
  return api.delete(`/comments/${id}`);
};