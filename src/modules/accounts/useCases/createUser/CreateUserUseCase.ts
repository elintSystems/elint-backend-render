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
class CreateUserUseCase {

    constructor(@inject("UsersRepository")
        private userRepository: IUsersRepository) {}

    async execute({ name, email, password }: ICreateUserDTO) {
        
        const UserAlreadyExists = await this.userRepository.findByEmail(email);

        if(UserAlreadyExists) {
            throw new AppError("User Already Exists");
        }
        const passwordCHash = await hash(password, 8);
        await this.userRepository.create({ name, password: passwordCHash, email });

    }
}

export { CreateUserUseCase }