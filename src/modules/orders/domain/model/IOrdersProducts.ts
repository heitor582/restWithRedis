import Product from '../../../products/infra/typeorm/entities/Product';
import Order from '../../infra/typeorm/entities/Order';

export default interface IOrdersProducts {
    id: string;
    order: Order;
    product: Product;
    product_id: string;
    order_id: string;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
