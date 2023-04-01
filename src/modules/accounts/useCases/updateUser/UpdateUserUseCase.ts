import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateUserUseCase {
  constructor(@inject("UsersRepository")
  private userRepository: IUsersRepository) {}
  
   async execute({id, name, email, password}: ICreateUserDTO) {
    const user = await this.userRepository.findById(id as string)

    if(!user) {
      throw new AppError("User doesn't exists")
    }

    user.password  = await hash(password, 8)
    
    await this.userRepository.create({id, name, email, password})

    return user;
  }

}

export { UpdateUserUseCase }