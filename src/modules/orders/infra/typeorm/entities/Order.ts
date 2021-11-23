import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Customer from '../../../../customers/infra/typeorm/entities/Customer';
import IOrder from '../../../domain/model/IOrder';

import OrdersProducts from './OrdersProducts';

@Entity('orders')
export default class Order implements IOrder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => OrdersProducts, orderP => orderP.order, {
        cascade: true,
    })
    order_products: OrdersProducts[];

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
