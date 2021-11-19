import path from 'path';
import { getCustomRepository } from 'typeorm';
import EtherealMail from '../../../config/mail/EtherealMail';

import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from './../typeorm/repositories/UsersTokensRepository';

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UsersTokensRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.', 401);
        }

        const { token } = await userTokenRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}
