import { Request, Response } from "express";
import { container } from "tsyringe";
import { SingleEmployeeUseCase } from "./SingleEmployeeUseCase";


class SingleEmployeeController {

    async handle(request: Request, response: Response) {
        const id = request.params.id
        console.log(id)

        const singleEmployeeUseCase = container.resolve(SingleEmployeeUseCase);

        const employee = await singleEmployeeUseCase.execute(id)

      return response.json(employee);
    }
}

export { SingleEmployeeController }