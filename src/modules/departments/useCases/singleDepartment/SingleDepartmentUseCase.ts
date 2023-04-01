import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IDepartmentsRepository from "../../repositories/IDepartmentsRepository";

@injectable()
class SingleDepartmentUseCase {

    constructor(@inject("DepartmentsRepository")
        private departmentRepository: IDepartmentsRepository) {}

    async execute(id: string) {
        
        const departments = await this.departmentRepository.findById(id);

        return departments;

    }
}

export { SingleDepartmentUseCase }