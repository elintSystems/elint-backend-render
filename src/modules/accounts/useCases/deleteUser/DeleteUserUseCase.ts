import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";



@injectable()
class DeleteUserUseCase {

    constructor(@inject("UsersRepository")
        private userRepository: IUsersRepository) {}

    async execute(id: string) {
        
        const user = await this.userRepository.findById(id);

        if(!user) {
          throw new AppError("User doesn't exists")
        }

        await this.userRepository.delete(id)

        return user;

    }
}

export { DeleteUserUseCase }