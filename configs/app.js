'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { corsOptions } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { dbConnection } from './db.js';

import commentRoutes from '../src/comments/comments.routes.js';
import postRoutes from '../src/posts/posts.routes.js';
import userRoutes from '../src/users/users.routes.js';

import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

const BASE_URL = '/OpinaNetAdmin/v1';

// Middlewares globales
const middlewares = (app) => {
  app.use(helmet(helmetConfiguration));
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));
  app.use(express.json({ limit: '10mb' }));
  app.use(requestLimit);
  app.use(morgan('dev'));
};

// Rutas
const routes = (app) => {
  app.use(`${BASE_URL}/comments`, commentRoutes);
  app.use(`${BASE_URL}/posts`, postRoutes);
  app.use(`${BASE_URL}/users`, userRoutes);

  // Health check
  app.get(`${BASE_URL}/health`, (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'OpinaNet Admin',
      version: '1.0.0',
    });
  });
};

// Inicialización del servidor
const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  try {
    await dbConnection();

    middlewares(app);
    routes(app);

    // Error handler SIEMPRE al final
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

export { initServer };