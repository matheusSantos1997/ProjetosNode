import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRoutes = Router();
const productsController = new ProductsController();

// rota listagem de produtos
productsRoutes.get('/product', productsController.index); // rota listagem de produtos

productsRoutes.get('/product/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
}), productsController.show);

productsRoutes.post('/product', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
    }
}), productsController.create);

productsRoutes.put('/product/:id', productsController.update,);

productsRoutes.delete('/product/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
}), productsController.delete);

export default productsRoutes; // exportando as rotas
