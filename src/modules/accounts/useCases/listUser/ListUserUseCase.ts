import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";


// interface IRequest {
//     name: string;
//     username: string;
//     password: string;
//     email: string;
//     driver_licence: string;
// }

@injectable()
class ListUserUseCase {

    constructor(@inject("UsersRepository")
        private userRepository: IUsersRepository) {}

    async execute() {
        
        const users = await this.userRepository.list();

        return users;

    }
}

export { ListUserUseCase }