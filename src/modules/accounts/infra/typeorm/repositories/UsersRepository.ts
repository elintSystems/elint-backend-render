import { Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { AppDataSource } from "../../../../../shared/infra/typeorm";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    
    async create({ name, password, email, id, avatar, is_admin }: ICreateUserDTO): Promise<void> {
        const user = await this.repository.create({
            name, password, email, id, is_admin
        });
        
        await this.repository.save(user);
    }
    async findByName(name: string): Promise<User | null> {
        const user = await this.repository.findOne({ 
          where: { name }
         });

        return user;
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOne({ 
          where: { email }
         });

        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.repository.findOne({
          where: { id }
        });

        return user;
    }

    async list(): Promise<User[]> {
        const list = await this.repository.find();

        return list;
    }

    async delete(id: string): Promise<void> {
      await this.repository.delete(id)
    }

}

export { UsersRepository };