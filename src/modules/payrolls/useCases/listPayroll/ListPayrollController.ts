import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPayrollUseCase } from "./ListPayrollUseCase";

class ListPayrollController {

    async handle(request: Request, response: Response) {
        const { 
          month, 
          year, 
          employee_id, 
          overtime50, 
          overtime100,
          absences, 
          month_total_workdays, 
          day_total_workhours,
          cash_advances,
           backpay,
           bonus } = request.body;

        const listPayrollUseCase = container.resolve(ListPayrollUseCase);

        const payrolls = await listPayrollUseCase.execute({ 
          month, 
          year,
          employee_id,
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

export { ListPayrollController }