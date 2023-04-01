import { Request, Response } from "express";
import { container } from "tsyringe";
import { InputPayrollUseCase } from "./InputPayrollUseCase";

class InputPayrollController {

    async handle(request: Request, response: Response) {
        const { 
          overtime50, 
          overtime100,
          absences, 
          month_total_workdays, 
          day_total_workhours,
          cash_advances,
          backpay,
          bonus } = request.body;
          const id = request.params.id;


        const inputPayrollUseCase = container.resolve(InputPayrollUseCase);

        const payrolls = await inputPayrollUseCase.execute({ 
          id,
          overtime50, 
          overtime100,
          absences,
          month_total_workdays, 
          day_total_workhours,
          cash_advances,
          backpay,
          bonus })

        return response.json(payrolls);
    }
}

export { InputPayrollController }