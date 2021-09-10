import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Product from "../../models/Product";
import { ProductRepository } from "../../repositories/ProductRepository";

interface IRequest {
    Id: string;
}

class ShowProductService {
    public async execute({Id} : IRequest): Promise<Product> {
        // chamando o product repository
        const productsRepository = getCustomRepository(ProductRepository);
        
        // vai listar todos os repositorios
        const product = await productsRepository.findOne(Id);
        
        if(!product) {
            throw new AppError('Product Not Found.');
        }
        return product;
    }
}

export default ShowProductService;