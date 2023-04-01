import { Request, Response } from "express";
import { container } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { ListUserUseCase } from "./ListUserUseCase";

interface IList {
  password?: string;
  is_admin?: boolean
}
class ListUserController {

    async handle(request: Request, response: Response) {

        const listUserUseCase = container.resolve(ListUserUseCase);

        const users = await listUserUseCase.execute()
        let users2: IList[] = users;
        
        users2.map(user => {
          delete user.password
          delete user.is_admin
        })

      return response.json(users2);
    }
}

export { ListUserController }