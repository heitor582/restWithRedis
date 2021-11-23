import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';

export default class UsersController {
    public async index(request: Request, res: Response): Promise<Response> {
        const listUser = new ListUserService();

        const users = await listUser.execute();

        return res.send(classToClass(users));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return res.send(classToClass(user));
    }
}
