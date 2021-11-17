import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import { CustomerRepository } from './../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found', 404);
        }

        const customerEmail = await customerRepository.findByEmail(email);

        if (customerEmail && customerEmail.email !== email) {
            throw new AppError('Customer not found', 404);
        }

        customer.name = name;
        customer.email = email;
        await customerRepository.save(customer);

        return customer;
    }
}
