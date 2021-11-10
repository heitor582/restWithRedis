import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '../errors/AppError';
import '@shared/typeorm';
import upload from '../../config/upload';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
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
