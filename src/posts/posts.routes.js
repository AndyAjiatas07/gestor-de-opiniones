import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostsByUser,
  getMyPosts,
  getPostById,
} from "./posts.controller.js";

import { verifyToken } from "../../middlewares/auth-validator.js";

import {
  validateCreatePost,
  validateUpdatePost,
  validatePostById,
  validateUserPosts,
} from "../../middlewares/post-validator.js";

const router = Router();

// Crear publicación
router.post("/", verifyToken, validateCreatePost, createPost);

// Listar todas las publicaciones
router.get("/", getAllPosts);

// Publicaciones del usuario autenticado
router.get("/me", verifyToken, getMyPosts);

// Publicaciones por usuario específico
router.get("/user/:userId", validateUserPosts, getPostsByUser);

// Publicación individual
router.get("/:id", getPostById);

// Actualizar publicación
router.put("/:id", verifyToken, validateUpdatePost, updatePost);

// Eliminar publicación
router.delete("/:id", verifyToken, validatePostById, deletePost);

export default router;
