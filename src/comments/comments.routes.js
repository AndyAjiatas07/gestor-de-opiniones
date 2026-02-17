import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
  getMyComments,
} from "./comments.controller.js";

import { verifyToken } from "../../middlewares/auth-validator.js";

import {
  validateCreateComment,
  validateUpdateComment,
  validateCommentById,
  validateCommentsByPost
} from "../../middlewares/comment-validator.js";

const router = Router();

// Crear comentario
router.post("/", verifyToken, validateCreateComment, createComment);

// Ver comentarios de una publicación
router.get("/post/:postId", validateCommentsByPost, getCommentsByPost);

// Ver mis comentarios
router.get("/me", verifyToken, getMyComments);

// Actualizar comentario
router.put("/:id", verifyToken, validateUpdateComment, updateComment);

// Eliminar comentario
router.delete("/:id", verifyToken, validateCommentById, deleteComment);

export default router;
