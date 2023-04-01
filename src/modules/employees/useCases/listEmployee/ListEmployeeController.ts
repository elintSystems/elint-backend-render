import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEmployeeUseCase } from "./ListEmployeeUseCase";


class ListEmployeeController {

    async handle(request: Request, response: Response) {

        const listEmployeeUseCase = container.resolve(ListEmployeeUseCase);

        const employees = await listEmployeeUseCase.execute()

      return response.json(employees);
    }
}

export { ListEmployeeController }