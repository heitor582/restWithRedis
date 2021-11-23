import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

export default class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UserRepository);

        const users = usersRepository.find();

        return users;
    }
}
