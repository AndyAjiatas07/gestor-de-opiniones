import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear publicación
export const validateCreatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ max: 150 })
    .withMessage('El título no puede exceder 150 caracteres'),

  body('category')
    .notEmpty()
    .withMessage('La categoría es requerida')
    .isLength({ max: 100 })
    .withMessage('La categoría no puede exceder 100 caracteres'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('El contenido es requerido')
    .isLength({ max: 5000 })
    .withMessage('El contenido no puede exceder 5000 caracteres'),

  checkValidators,
];

// Actualizar publicación
export const validateUpdatePost = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido'),

  body('title')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('El título no puede exceder 150 caracteres'),

  body('category')
    .optional()
    .isLength({ max: 100 })
    .withMessage('La categoría no puede exceder 100 caracteres'),

  body('content')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('El contenido no puede exceder 5000 caracteres'),

  checkValidators,
];

// Publicación por ID
export const validatePostById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido'),

  checkValidators,
];