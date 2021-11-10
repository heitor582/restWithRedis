import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';

export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT Token is missing.', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, auth.jwt.secret);
        req.body.id = decodedToken;
        return next();
    } catch {
        throw new AppError('Invalid JWT Token', 401);
    }
}
