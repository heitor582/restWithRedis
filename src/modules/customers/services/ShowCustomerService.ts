import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

export default class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found', 401);
        }

        return customer;
    }
}
