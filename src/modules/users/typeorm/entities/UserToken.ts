import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_tokens')
export default class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
