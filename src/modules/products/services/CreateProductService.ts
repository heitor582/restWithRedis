import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import redisCache from '../../../shared/cache/RedisCache';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError(
                'There is already one product with this name',
                409,
            );
        }

        const redisKey = 'api-vendas-PRODUCT_LIST';
        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await redisCache.invalidate(redisKey);

        await productsRepository.save(product);

        return product;
    }
}
