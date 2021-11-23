import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
}

export default class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.', 404);
        }

        return product;
    }
}
