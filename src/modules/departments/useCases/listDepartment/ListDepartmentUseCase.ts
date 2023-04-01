import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IDepartmentsRepository from "../../repositories/IDepartmentsRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";

@injectable()
class ListDepartmentUseCase {

    constructor(@inject("DepartmentsRepository")
        private departmentRepository: IDepartmentsRepository,
        
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository) {}

    async execute() {
        
        const departments = await this.departmentRepository.list();
        const employeeList = await this.employeeRepository.list();

        departments.map(department => {
          department.total_employee = (employeeList.filter(employee => 
            employee.department_id === department.id)).length
        })

        return departments;

    }
}

export { ListDepartmentUseCase }