import { Request, Response } from "express";
import CreateProductService from "../services/product/CreateProductService";
import DeleteProductServices from "../services/product/DeleteProductService";
import ListProductService from "../services/product/ListProductService";
import ShowProductService from "../services/product/ShowProductService";
import UpdateProductService from "../services/product/UpdateProductService";

export default class ProductsController {
    // listagem de produtos 
    public async index(request: Request, response: Response){
        const listProducts = new ListProductService();

        const products = await listProducts.execute();

        return response.json(products);
    }

    public async show(request: Request, response: Response): Promise<Response>{
        const { Id } = request.params;

        const showProduct = new ShowProductService();

        const product = await showProduct.execute({Id});

        return response.json(product);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            price,
            quantity
        });

        return response.json(product);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const { name, price, quantity } = request.body;

        const {Id} = request.params;

        const updateProduct = new UpdateProductService();

        const product = await updateProduct.execute({
            Id,
            name,
            price,
            quantity
        });

        return response.json(product);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
         const { Id } = request.params;

         const deleteProduct = new DeleteProductServices

         await deleteProduct.execute({Id});

         return response.json({message: 'deleted product.'});
    }
}