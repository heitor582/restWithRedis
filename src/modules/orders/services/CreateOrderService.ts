import { ProductRepository } from './../../products/typeorm/repositories/ProductsRepository';
import { CustomerRepository } from './../../customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from './../typeorm/repositories/OrdersRepository';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

export default class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const orderRepository = getCustomRepository(OrdersRepository);
        const customerRepository = getCustomRepository(CustomerRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customerExists = await customerRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError('Customer not exists', 404);
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError('Products not exists', 404);
        }

        const existsProductsIds = existsProducts.map(v => v.id);

        const checkInexistentProducts = products.filter(
            v => !existsProductsIds.includes(v.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError('Products not exists', 404);
        }

        const quantityAvaliable = products.filter(
            v =>
                existsProducts.filter(i => i.id === v.id)[0].quantity <
                v.quantity,
        );

        if (quantityAvaliable.length) {
            throw new AppError('Products not exists', 404);
        }

        const serializedProduts = products.map(v => ({
            product_id: v.id,
            quantity: v.quantity,
            price: existsProducts.filter(p => p.id === v.id)[0].price,
        }));

        const order = await orderRepository.createOrder({
            customer: customerExists,
            products: serializedProduts,
        });

        const { order_products } = order;

        const updatedQuantity = order_products.map(v => ({
            id: v.product_id,
            quantity:
                existsProducts.filter(p => v.product_id === p.id)[0].quantity -
                v.quantity,
        }));

        await productsRepository.save(updatedQuantity);

        return order;
    }
}
