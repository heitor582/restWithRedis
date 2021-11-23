import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    password: string;
    email: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);
        const userExists = await usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Email address already used.', 409);
        }

        const hashedPassword = await hash(password, 10);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}
