import { Request, Response } from "express";
import { container } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

interface IList {
  password?: string;
  is_admin?: boolean
}
class DeleteUserController {

    async handle(request: Request, response: Response) {
      const id = request.params.id
      console.log("asdas")
        const deleteUserUseCase = container.resolve(DeleteUserUseCase);

        const user = await deleteUserUseCase.execute(id)
      
      return response.json(user);
    }
}

export { DeleteUserController }