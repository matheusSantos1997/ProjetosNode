import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Product from "../../models/Product";
import { ProductRepository } from "../../repositories/ProductRepository";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        // chamando o product repository
        const productsRepository = getCustomRepository(ProductRepository);
        
        // permite nao cadastrar um produto com o mesmo nome
        const productExist = await productsRepository.findByName(name);
        
        // verifica se existe um produto com o mesmo nome
        if(productExist){
            throw new AppError('There is already one product with this name.');
        }
        
        // insere
        const product = productsRepository.create({
            name,
            price,
            quantity
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;