import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear comentario
export const validateCreateComment = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('El comentario es requerido')
    .isLength({ max: 1000 })
    .withMessage('El comentario no puede exceder 1000 caracteres'),

  body('postId')
    .notEmpty()
    .withMessage('Debe especificar la publicación')
    .isMongoId()
    .withMessage('El postId debe ser un ID válido'),

  checkValidators,
];

// Actualizar comentario
export const validateUpdateComment = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido'),

  body('content')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('El comentario no puede exceder 1000 caracteres'),

  checkValidators,
];

// Comentario por ID
export const validateCommentById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido'),

  checkValidators,
];