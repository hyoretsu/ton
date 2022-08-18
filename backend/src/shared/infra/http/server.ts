/* eslint-disable no-console */
import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Postgres from '@shared/infra/sequelize';
import '@shared/containers';

import routes from './routes';

const app = express();

Postgres.sync().then(() => {
  app.use(cors({ origin: process.env.APP_API_URL }));
  app.use(express.json());
  app.use('/files', express.static(uploadConfig.uploadsFolder));
  app.use(routes);

  app.use(errors());

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });

  app.listen(3333, () => {
    console.log('Server started on port 3333!');
  });
});
