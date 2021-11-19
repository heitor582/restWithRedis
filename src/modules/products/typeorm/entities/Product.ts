import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import OrdersProducts from '../../../orders/typeorm/entities/OrdersProducts';

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => OrdersProducts, orderP => orderP.product)
    order_products: OrdersProducts[];

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
