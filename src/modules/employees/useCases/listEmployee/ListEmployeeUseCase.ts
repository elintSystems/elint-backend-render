import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";


@injectable()
class ListEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository) {}
       
    async execute() {
      function formatSalary() {
        return new Intl.NumberFormat("de-DE",{minimumFractionDigits: 2})
      }
     
        const users = await this.employeeRepository.list();
        // users.map(user => {
        //   const dateFormatter = Intl.DateTimeFormat('pt-br')
        //   //  const dateFormatter = Intl.DateTimeFormat('sv-SE')
        //   // console.log(new Date().toLocaleDateString('pt-br'))
        //   // console.log(user.salary)
        //   //  user.salary = parseFloat(user.salary.toFixed(2))
        //   user.salary = formatSalary().format(+(+user.salary).toFixed(2))
        //   user.birth_date = dateFormatter.format(user.birth_date)  as any
        //   user.start_date = dateFormatter.format(user.start_date)  as any
        //   // console.log(user.salary = (+user.salary).toLocaleString("de-DE"))
        // })

        return users;

    }
}

export { ListEmployeeUseCase }

