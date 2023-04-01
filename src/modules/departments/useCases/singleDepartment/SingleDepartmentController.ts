import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDepartmentUseCase } from "../listDepartment/ListDepartmentUseCase";
import { SingleDepartmentUseCase } from "./SingleDepartmentUseCase";

class SingleDepartmentController {

    async handle(request: Request, response: Response) {
        const id = request.params.id;

        const singleDepartmentUseCase = container.resolve(SingleDepartmentUseCase);

        const department = await singleDepartmentUseCase.execute(id)

      return response.json(department);
    }
}

export { SingleDepartmentController }