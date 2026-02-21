import { Router } from "express";
import {
  register,
  login,
  updateProfile,
  getMyProfile,
  getAllUsers,
} from "./users.controller.js";

import { verifyToken } from "../../middlewares/auth-validator.js";

import {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateProfile,
} from "../../middlewares/user-validator.js";

const router = Router();

// Registro
router.post("/register", validateRegisterUser, register);

// Login
router.post("/login", validateLoginUser, login);

// Obtener mis datos
router.get("/me", verifyToken, getMyProfile);

// Obtener todos los usuarios
router.get("/", verifyToken, getAllUsers);

// Actualizar perfil
router.put("/profile", verifyToken, validateUpdateProfile, updateProfile);

export default router;
