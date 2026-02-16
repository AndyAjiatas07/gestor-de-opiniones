import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost
} from "./posts.controller.js";

import { verifyToken } from "../../middlewares/auth-validator.js";

import {
  validateCreatePost,
  validateUpdatePost,
  validatePostById
} from "../../middlewares/post-validator.js";

const router = Router();

// Crear publicación
router.post(
  "/",
  verifyToken,
  validateCreatePost,
  createPost
);

// Actualizar publicación
router.put(
  "/:id",
  verifyToken,
  validateUpdatePost,
  updatePost
);

// Eliminar publicación
router.delete(
  "/:id",
  verifyToken,
  validatePostById,
  deletePost
);

export default router;