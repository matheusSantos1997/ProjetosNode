import { getCustomRepository } from "typeorm";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";


class ListUserService {
    public async execute(): Promise<User[]>{
        
        const usersRepository = getCustomRepository(UserRepository);

        const users = await usersRepository.find();

        return users;
    }
}

export default ListUserService;