import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListInputPayrollUseCase } from "./ListInputPayrollUseCase";


class ListInputPayrollController {

    async handle(request: Request, response: Response) {
        const { year, month } = request.body

        const listInputPayrollUseCase = container.resolve(ListInputPayrollUseCase);

        const payrolls = await listInputPayrollUseCase.execute(year, month)

        return response.json(payrolls);
    }
}

export { ListInputPayrollController }