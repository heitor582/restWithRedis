import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
}

export default class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found', 401);
        }

        return user;
    }
}
