import { EntityRepository, Repository } from "typeorm";
import Product from "../models/Product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
     
     // método para encontrar produto pelo nome
     public async findByName(name: string): Promise<Product | undefined>{
        const product = await this.findOne({
          where:{
            name,
          },
        });

        return product;
      }
}