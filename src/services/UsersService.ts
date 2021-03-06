import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {

        // Check if user already exists
        const userExists = await this.usersRepository.findOne({
            email
        })

        //If it already exists, then return user
        if(userExists) {
            return userExists;
        }

        //if user does not exists, register user
        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        return user;
    };

    async findByEmail(email: string) {

        const user = await this.usersRepository.findOne({
            email
        });

        return user;
    };
}

export { UsersService };