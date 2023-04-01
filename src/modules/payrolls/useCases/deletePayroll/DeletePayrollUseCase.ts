import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";



@injectable()
class DeletePayrollUseCase {

    constructor(@inject("PayrollRepository")
    private payrollRepository: IPayrollRepository) {}

    async execute(year: number, month: string) {
        // console.log(month,"++++++++++++++++++++++++")
        const allPayrolls = await this.payrollRepository.findAllByYearAndByMonth(year, month);

        if (allPayrolls?.length! <= 0) {
          throw new AppError("Payroll doesn't exists")
        }

        // allPayrolls!.map( async (payroll) => {
        //   await this.payrollRepository.delete(payroll.id)

        // })

        await this.payrollRepository.deleteAllByYearAndMonth(year, month)

        return allPayrolls;
    }
}

export { DeletePayrollUseCase }