import '@shared/typeorm';
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { pagination } from 'typeorm-pagination';

import upload from '../../../config/upload';
import AppError from '../../errors/AppError';
import rateLimiter from './middleware/rateLimiter';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(upload.directory));
app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'Error',
            message: error.message,
        });
    }

    return res
        .status(500)
        .json({ status: 'Error', message: 'Internal server error' });
});

app.listen(port);
