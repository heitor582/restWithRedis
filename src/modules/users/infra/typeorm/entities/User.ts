import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import IUser from '../../../domain/models/IUser';

@Entity('users')
export default class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null | undefined {
        if (!this.avatar) {
            return null;
        }

        `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}
