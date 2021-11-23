import { getCustomRepository } from 'typeorm';
import redisCache from '../../../shared/cache/RedisCache';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

export default class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);
        const redisKey = 'api-vendas-PRODUCT_LIST';

        let products = await redisCache.recover<Product[]>(redisKey);

        if (!products) {
            products = await productsRepository.find();

            await redisCache.save(redisKey, products);
        }

        return products;
    }
}
