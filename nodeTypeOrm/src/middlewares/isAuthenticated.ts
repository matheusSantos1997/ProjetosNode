import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

// middleware de authorizaçao
export default function isAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
    ): void{
     const authHeader = request.headers.authorization;
      
     // verifica se o token existe
     if(!authHeader){
         throw new AppError('JWT Token is missing.');
     }

     // Bearer reerterrjjweewwqewejqejrjirwer9
     const [, token] = authHeader.split(' ');

     // verifica se o token é valido
     try{
        const decodedToken = verify(token, auth.jwt.secret);

        // console.log(decodedToken);

        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub
        }

        return next();
     }catch{
        throw new AppError('Invalid JWT Token.');
     }
}