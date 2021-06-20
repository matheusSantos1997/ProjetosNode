import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/routes';
import AppError from './errors/AppError';
import './typeorm/index';

// express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errors());

// middlewares
app.use((error: Error,
         request: Request,
         response: Response,
         next: NextFunction) => {
            // se o erro for uma instancia
            if(error instanceof AppError) {
               return response.status(error.statusCode).json({
                 status: 'error',
                 messsage: error.message,
               });
            }

            return response.status(500).json({
              status: 'error',
              message: 'Internal server error',
            });
         },
         ); // fim middlewares

//criando o servidor
app.listen(3333, () => {
    console.log('Server is started on port 3333! ');
});
