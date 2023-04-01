import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IDepartmentsRepository from "../../repositories/IDepartmentsRepository";

@injectable()
class DeleteDepartmentUseCase {

    constructor(@inject("DepartmentsRepository")
        private departmentRepository: IDepartmentsRepository) {}

    async execute(id: string) {
        
        const departments = await this.departmentRepository.findById(id);

        if(!departments) {
          throw new AppError("Department doesn't exists")
        }

        await this.departmentRepository.delete(id)

        return departments;

    }
}

export { DeleteDepartmentUseCase }