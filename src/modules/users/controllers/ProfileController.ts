import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
    public async show(req: Request, res: Response): Promise<Response> {
        const showProfileService = new ShowProfileService();
        const { user_id } = req.body;

        const user = await showProfileService.execute(user_id);

        return res.send(classToClass(user));
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { name, email, password, user_id, old_password } = req.body;

        const updateProfileService = new UpdateProfileService();

        const user = await updateProfileService.execute({
            name,
            email,
            password,
            user_id,
            old_password,
        });

        return res.send(classToClass(user));
    }
}
