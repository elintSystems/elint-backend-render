import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";


@injectable()
class CreateEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private userRepository: IEmployeesRepository) {}

    async execute(data: ICreateEmployeeDTO) {
        
        const UserAlreadyExists = await this.userRepository.findByName(data.name);

        data.subsidy = data.subsidy ?? 0 as any;
        data.vacation = data.vacation ?? 0 as any;

        if(UserAlreadyExists) {
            throw new AppError("Employee Already Exists");
        }
        await this.userRepository.create(data);

    }
}

export { CreateEmployeeUseCase }