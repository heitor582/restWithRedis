import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCostumerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class CustomersControllers {
    public async index(req: Request, res: Response): Promise<Response> {
        const listCustomers = new ListCostumerService();
        const customers = await listCustomers.execute();

        return res.status(200).send(customers);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showCustomers = new ShowCustomerService();
        const customers = await showCustomers.execute({ id });

        return res.status(200).send(customers);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;

        const createCustomers = new CreateCustomerService();
        const customers = await createCustomers.execute({
            name,
            email,
        });
        return res.status(201).send(customers);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;
        const { id } = req.params;

        const updateCustomers = new UpdateCustomerService();

        const customers = await updateCustomers.execute({
            id,
            name,
            email,
        });

        return res.status(200).send(customers);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const deleteCustomers = new DeleteCustomerService();

        await deleteCustomers.execute({ id });

        return res.status(200).send();
    }
}
