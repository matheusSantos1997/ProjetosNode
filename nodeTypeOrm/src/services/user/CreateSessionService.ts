import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import auth from "../../config/auth";
import AppError from "../../errors/AppError";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionService {

    public async execute({ email, password }: IRequest): Promise<IResponse>{
        
        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // configurando o token de autenticaçao
        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn
        })

        return {
            user,
            token
        }
            
    }

}

export default CreateSessionService;