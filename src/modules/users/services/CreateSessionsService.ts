import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import auth from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
    password: string;
    email: string;
}

interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const hashedPassword = await compare(password, user.password);

        if (!hashedPassword) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn,
        });

        return { user, token };
    }
}
