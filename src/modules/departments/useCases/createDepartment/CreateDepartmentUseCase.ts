import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import ICreateDepartmentDTO from "../../dtos/ICreateDepartmentDTO";
import IDepartmentsRepository from "../../repositories/IDepartmentsRepository";


// interface IRequest {
//     name: string;
//     username: string;
//     password: string;
//     email: string;
//     driver_licence: string;
// }

@injectable()
class CreateDepartmentUseCase {

    constructor(@inject("DepartmentsRepository")
        private departmentsRepository: IDepartmentsRepository) {}

    async execute({ name }: ICreateDepartmentDTO) {
        
        const depadrtmentAlreadyExists = await this.departmentsRepository.findByName(name);

        if(depadrtmentAlreadyExists) {
            throw new AppError("Department Already Exists");
        }
        await this.departmentsRepository.create({ name });

    }
}

export { CreateDepartmentUseCase }