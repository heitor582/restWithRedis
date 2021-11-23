import OrdersProducts from '../../../orders/infra/typeorm/entities/OrdersProducts';

export default interface IProduct {
    id: string;
    order_products: OrdersProducts[];
    name: string;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
