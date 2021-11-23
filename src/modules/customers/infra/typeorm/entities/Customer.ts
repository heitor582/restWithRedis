import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICustomer } from '../../../domain/models/ICustomer';

@Entity('customers')
export default class Customer implements ICustomer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
