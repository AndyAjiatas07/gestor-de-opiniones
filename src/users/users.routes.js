import { Router } from "express";
import {
  register,
  login,
  updateProfile
} from "./users.controller.js";

import { verifyToken } from "../../middlewares/auth-validator.js";

import {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateProfile
} from "../../middlewares/user-validator.js";

const router = Router();

// Registro
router.post(
  "/register",
  validateRegisterUser,
  register
);

// Login
router.post(
  "/login",
  validateLoginUser,
  login
);

// Actualizar perfil
router.put(
  "/profile",
  verifyToken,
  validateUpdateProfile,
  updateProfile
);

export default router;