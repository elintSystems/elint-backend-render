import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDepartmentUseCase } from "./ListDepartmentUseCase";

class ListDepartmentController {

    async handle(request: Request, response: Response) {

        const listDepartmentUseCase = container.resolve(ListDepartmentUseCase);

        const departments = await listDepartmentUseCase.execute()

      return response.json(departments);
    }
}

export { ListDepartmentController }