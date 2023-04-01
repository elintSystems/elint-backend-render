import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";



@injectable()
class DeleteEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository) {}

    async execute(id: string) {
        
        const user = await this.employeeRepository.findById(id);

        if (!user) {
          throw new AppError("Employee doesn't exists")
        }

        await this.employeeRepository.delete(id)

        return user;
    }
}

export { DeleteEmployeeUseCase }