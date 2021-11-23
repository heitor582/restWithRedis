import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import ICreateCustomer from '../domain/models/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';

export default class CreateCustomerService {
    public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
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
