import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import format from 'date-fns/format'



@injectable()
class SingleEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("PositionsRepository")
        private positionRepository: IPositionsRepository,
        @inject("DepartmentsRepository")
        private departmentRepository: IDepartmentsRepository) {}

    async execute(id: string) {
        
        const user = await this.employeeRepository.findById(id);
        //  console.log("SIngle UseCase: ", user)
        const dateFormatter = Intl.DateTimeFormat('pt-br')

        if (!user) {
          throw new AppError("Employee doesn't exists")
        }
        const positionName = await this.positionRepository.findById(user.position_id)
        const departmentName = await this.departmentRepository.findById(user.department_id)
        // user.birth_date = dateFormatter.format(user.birth_date) as any
        // user.start_date = dateFormatter.format(user.start_date) as any
        
        let de = "31/01/1999"
        const [d, m, a] = de.split("/")
        let nwd = `${m}/${d}/${a}`
        console.log(new Date(nwd))
        // if(!user.position_id && !user.department_id) {
        //   user.position_id =  ""
        //   user.department_id = ""
        // } else {
        //   user.position_id = positionName?.name!
        //   user.department_id = departmentName?.name!
        // }
        user.position_id ? user.position_id = positionName?.name! : ""
        user.department_id ? user.department_id = departmentName?.name! : ""
       
        return user;

        

    }
}

export { SingleEmployeeUseCase }