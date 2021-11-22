import { getCustomRepository } from 'typeorm';
import redisCache from '../../../shared/cache/RedisCache';

import AppError from '../../../shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
}

export default class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.', 404);
        }

        const redisKey = 'api-vendas-PRODUCT_LIST';
        await redisCache.invalidate(redisKey);

        await productsRepository.remove(product);
    }
}
