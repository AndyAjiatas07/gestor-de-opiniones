import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment
} from "./comments.controller.js";

import { verifyToken } from "../../middlewares/auth-validator.js";

import {
  validateCreateComment,
  validateUpdateComment,
  validateCommentById
} from "../../middlewares/comment-validator.js";

const router = Router();

// Crear comentario
router.post(
  "/",
  verifyToken,
  validateCreateComment,
  createComment
);

// Actualizar comentario
router.put(
  "/:id",
  verifyToken,
  validateUpdateComment,
  updateComment
);

// Eliminar comentario
router.delete(
  "/:id",
  verifyToken,
  validateCommentById,
  deleteComment
);

export default router;