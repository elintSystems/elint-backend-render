import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePayrollUseCase } from "./DeletePayrollUseCase";


class DeletePayrollController {

    async handle(request: Request, response: Response) {
        const id = request.params.id
        const { year, month } = request.body
        // console.log(month+"---------------------------")

        const deletePayrollUseCase = container.resolve(DeletePayrollUseCase);

        const employee = await deletePayrollUseCase.execute(year, month)

      return response.status(200).json(employee);
    }
}

export { DeletePayrollController }