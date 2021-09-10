import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Product from "../../models/Product";
import { ProductRepository } from "../../repositories/ProductRepository";

interface IRequest {
    Id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {    
    public async execute({Id, name, price, quantity } : IRequest): Promise<Product> {
        // chamando o product repository
        const productsRepository = getCustomRepository(ProductRepository);
        
        // vai listar todos os repositorios
        const product = await productsRepository.findOne(Id);
        
        if(!product) {
            throw new AppError('Product Not Found.');
        }

        const productExist = await productsRepository.findByName(name);

        if(productExist){
            throw new AppError('There is already one product with this name.');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity
        
        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;