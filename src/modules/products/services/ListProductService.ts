import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export default class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);
        const redisKey = 'api-vendas-PRODUCT_LIST';
        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>(redisKey);

        if (!products) {
            products = await productsRepository.find();

            await redisCache.save(redisKey, products);
        }

        return products;
    }
}
