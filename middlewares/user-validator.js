import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Registro
export const validateRegisterUser = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('El nombre de usuario es requerido')
    .isLength({ max: 50 })
    .withMessage('El nombre de usuario no puede exceder 50 caracteres'),

  body('email')
    .notEmpty()
    .withMessage('El correo es requerido')
    .isEmail()
    .withMessage('Correo no válido'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  checkValidators,
];

// Login
export const validateLoginUser = [
  body('identifier')
    .notEmpty()
    .withMessage('Debe ingresar correo o nombre de usuario'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),

  checkValidators,
];

// Actualizar perfil
export const validateUpdateProfile = [
  body('username')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('El nombre de usuario no puede exceder 50 caracteres'),

  body('oldPassword')
    .optional()
    .notEmpty()
    .withMessage('Debe ingresar la contraseña actual'),

  body('newPassword')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres'),

  checkValidators,
];

// Usuario por ID
export const validateUserById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido'),

  checkValidators,
];