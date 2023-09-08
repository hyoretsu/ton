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
    console.log(`\x1b[32m${format(new Date(), 'd/M/Y - k:mm:ss.T')}\x1b[0m`);
    console.log(`IP \x1b[33m${req.ip}\x1b[0m`);
    console.log(`Dispositivo \x1b[33m${req.headers['user-agent']}\x1b[0m`);
    console.log(`${req.method} '${req.url}'`);
    if (req.url !== '/users/login' && Object.entries(req.body || {}).length > 0) {
        console.log(req.body);
    }

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
        console.log(`\x1b[31m${err.message} (Error ${err.statusCode})\x1b[0m`);

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
