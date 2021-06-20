import { getCustomRepository } from "typeorm";
import Product from "../models/Product";
import { ProductRepository } from "../repositories/ProductRepository";


class ListProductService {
    public async execute(): Promise<Product[]> {
        
        // chamando o product repository
        const productsRepository = getCustomRepository(ProductRepository);
        
        // vai listar todos os repositorios
        const products = await productsRepository.find();

        return products;
        
    }
}

export default ListProductService;