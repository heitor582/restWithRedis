import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';

export default class ListCostumerService {
    public async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomerRepository);

        const customers = customersRepository.find();

        return customers;
    }
}
