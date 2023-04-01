import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteEmployeeUseCase } from "./DeleteEmployeeUseCase";


class DeleteEmployeeController {

    async handle(request: Request, response: Response) {
        const id = request.params.id
        console.log(id)

        const deleteEmployeeUseCase = container.resolve(DeleteEmployeeUseCase);

        const employee = await deleteEmployeeUseCase.execute(id)

      return response.status(200).json(employee);
    }
}

export { DeleteEmployeeController }