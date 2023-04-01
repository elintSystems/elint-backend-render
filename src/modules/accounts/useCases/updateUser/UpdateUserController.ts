import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";


class UpdateUserController {
  async handle(request: Request, response: Response) {
    const {name, email, password} = request.body;
    const id = request.params.id;

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const position = await updateUserUseCase.execute({id, name, email, password})

    return response.status(204).json(position)
  }
}


export { UpdateUserController }