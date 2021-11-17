import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import Costumer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Costumer> {
        const customersRepository = getCustomRepository(CustomerRepository);
        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists) {
            throw new AppError('Email address already used.', 409);
        }

        const user = customersRepository.create({
            name,
            email,
        });

        await customersRepository.save(user);

        return user;
    }
}
