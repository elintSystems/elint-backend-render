import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

//DTO
// interface ICreateUserDTO {
//     name: string,
//     username: string,
//     password: string,
//     email: string,
//     driver_licence: string,
// }

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    
    findByName(name: string): Promise<User| null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    list(): Promise<User[]>;
    delete(id: string): Promise<void>
    
}

export { IUsersRepository }