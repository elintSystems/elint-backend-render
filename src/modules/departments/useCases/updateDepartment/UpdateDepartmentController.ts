import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateDepartmentUseCase } from "./UpdateDepartmentUseCase";

class UpdateDepartmentController {
  async handle(request: Request, response: Response) {
    const {name} = request.body;
    const id = request.params.id;

    const updateDepartmentUseCase = container.resolve(UpdateDepartmentUseCase)

    const department = await updateDepartmentUseCase.execute({id, name})

    return response.status(204).json(department)
  }
}


export { UpdateDepartmentController }