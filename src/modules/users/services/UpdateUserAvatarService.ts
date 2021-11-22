import { getCustomRepository } from 'typeorm';

import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/AppError';
import DiskStorageProvider from '../../../shared/providers/storageProvider/DiskStorageProvider';
import S3StorageProvider from '../../../shared/providers/storageProvider/S3StorageProvider';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    avatarFilename: string | undefined;
    user_id: string;
}

export default class UpdateUserAvatarService {
    public async execute({ avatarFilename, user_id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.', 401);
        }

        if (uploadConfig.driver === 's3') {
            const s3Provider = new S3StorageProvider();
            if (user.avatar) {
                await s3Provider.deleteFile(user.avatar);
            }

            user.avatar = await s3Provider.saveFile(
                avatarFilename || 'default',
            );
        } else {
            const storageProvider = new DiskStorageProvider();
            if (user.avatar) {
                await storageProvider.deleteFile(user.avatar);
            }

            user.avatar = await storageProvider.saveFile(
                avatarFilename || 'default',
            );
        }

        await usersRepository.save(user);

        return user;
    }
}
