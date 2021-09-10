import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import { ProductRepository } from "../../repositories/ProductRepository";

interface IRequest {
    Id: string;
}

class DeleteProductServices {
    public async execute({ Id } : IRequest): Promise<void> {
        // chamando o product repository
        const productsRepository = getCustomRepository(ProductRepository);
        
        // verifica se existe um produto
        const product = await productsRepository.findOne(Id);
        
        if(!product) {
            throw new AppError('Product Not Found.');
        }

        await productsRepository.remove(product);
    }
}

export default DeleteProductServices;