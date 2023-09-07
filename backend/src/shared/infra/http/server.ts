/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { errors } from 'celebrate';
import cors from 'cors';
import { format } from 'date-fns';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/containers';

import routes from './routes';

const app = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
    cors: {
        methods: ['GET', 'POST'],
    },
});

export const prisma = new PrismaClient({ log: ['error', 'info', 'warn'] });

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('-----');
    console.log(`Rota: ${req.method} '${req.url}'`);
    Object.entries(req.body || {}).length > 0 && console.log('Corpo', req.body);

    next();
});

app.use(`${process.env.NODE_ENV === 'production' ? '/ton' : ''}/files`, express.static(uploadConfig.uploadsFolder));
app.use(process.env.NODE_ENV === 'production' ? '/ton' : '', routes);

app.use(errors());

io.on('connection', socket => {
    console.log(`${socket.id} connected`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        console.log(`${format(new Date(), "d/M/Y, 'às' k:mm:ss")} ${err.message} (Error ${err.statusCode})`);

        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

httpServer.listen(3332);
app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
