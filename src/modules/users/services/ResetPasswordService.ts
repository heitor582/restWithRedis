import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from './../typeorm/repositories/UsersTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

export default class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UsersTokensRepository);
        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists.', 404);
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists.', 404);
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token invalid.', 401);
        }

        user.password = await hash(password, 8);

        usersRepository.save(user);
    }
}
