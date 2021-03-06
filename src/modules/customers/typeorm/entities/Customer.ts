import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export default class Customer {
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
