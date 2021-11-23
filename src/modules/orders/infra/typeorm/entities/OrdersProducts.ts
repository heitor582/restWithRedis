import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Product from '../../../../products/infra/typeorm/entities/Product';
import IOrdersProducts from '../../../domain/model/IOrdersProducts';

import Order from './Order';

@Entity('orders_products')
export default class OrdersProducts implements IOrdersProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    product_id: string;

    @Column()
    order_id: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
