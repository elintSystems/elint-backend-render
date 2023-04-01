import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateEmployeeDTO } from "../../../dtos/ICreateEmployeeDTO";
import { IEmployeesRepository } from "../../../repositories/IEmployeesRepository";
import { Employee } from "../entities/Employee";

class EmployeesRepository implements IEmployeesRepository {
    private repository: Repository<Employee>;

    constructor() {
        this.repository = AppDataSource.getRepository(Employee);
    }
    
    async create({ id, employee_id, name, dependents, salary, position_id, department_id, birth_date, 
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
      social_security,}: ICreateEmployeeDTO): Promise<void> {
        const user =  this.repository.create({
            name, employee_id, salary, id, dependents, position_id, department_id, birth_date,
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
            start_date,
            employee_status,
            bank_name,
            bank_account,
            nib,
            social_security,
     
        });
        
        await this.repository.save(user);
    }
    async findByName(name: string): Promise<Employee | null> {
        const user = await this.repository.findOne({ 
          where: { name }
         });

        return user;
    }
    
    async findByEmployeeId(employee_id: number): Promise<Employee | null> {
        const user = await this.repository.findOne({ 
          where: { employee_id }
         });

        return user;
    }

    async findById(id: string): Promise<Employee | null> {
        const user = await this.repository.findOne({
          where: { id }
        });
        // console.log("ByyyyyyyyyyyyID:  ", user)
        return user;
    }

    async list(): Promise<Employee[]> {
        const list = await this.repository.find();

        return list;
    }

    async delete(id: string): Promise<void> {
      await this.repository.delete(id)
    }

}

export { EmployeesRepository };


