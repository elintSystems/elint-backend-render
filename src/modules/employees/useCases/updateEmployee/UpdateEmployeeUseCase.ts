import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";

@injectable()
class UpdateEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}
  
   async execute({id, employee_id, name, dependents, salary, position_id, department_id, birth_date, 
    place_birth,
    nationality,
    bi,
    marital_status,
    gender,
    address,
    contact,
    contact2,
    email,
    nuit,
    vacation,
    subsidy,
    department,
    position,
    start_date,
    employee_status,
    bank_name,
    bank_account,
    nib,
    social_security,}: ICreateEmployeeDTO) {
    const employee = await this.employeesRepository.findById(id as string)

    if(!employee) {
      throw new AppError("Employee doesn't exists")
    }

    // employee.birth_date = birth_date as Date

    await this.employeesRepository.create({id, employee_id, name, dependents, salary, position_id, department_id, birth_date, 
      place_birth,
      nationality,
      bi,
      marital_status,
      gender,
      address,
      contact,
      contact2,
      email,
      nuit,
      vacation,
      subsidy,
      department,
      position,
      start_date,
      employee_status,
      bank_name,
      bank_account,
      nib,
      social_security,
    })

    return employee;
  }

}

export { UpdateEmployeeUseCase }