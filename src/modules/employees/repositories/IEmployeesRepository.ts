import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";
import { Employee } from "../infra/typeorm/entities/Employee";


//DTO
// interface ICreateUserDTO {
//     name: string,
//     username: string,
//     password: string,
//     email: string,
//     driver_licence: string,
// }

interface IEmployeesRepository {
    create(data: ICreateEmployeeDTO): Promise<void>;
    
    findByName(name: string): Promise<Employee| null>;
    findByEmployeeId(employee_id: number): Promise<Employee | null>;
    findById(id: string): Promise<Employee | null>;
    delete(id: string): Promise<void>

    list(): Promise<Employee[]>;
    
}

export { IEmployeesRepository }