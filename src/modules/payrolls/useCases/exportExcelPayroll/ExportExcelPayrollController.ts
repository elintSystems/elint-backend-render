import { Request, Response } from "express";
import { container } from "tsyringe";
import { ExportExcelPayrollUseCase } from "./ExportExcelPayrollUseCase";
import exceljs from "exceljs"

class ExportExcelPayrollController {

    async handle(request: Request, response: Response) {
      const { year, month } = request.body

      const exportExcelPayrollUseCase = container.resolve(ExportExcelPayrollUseCase);

        const payrolls = await exportExcelPayrollUseCase.execute(year, month)

        try {
          let workbook = new exceljs.Workbook();
      
          const sheet = workbook.addWorksheet("books");
      
          sheet.columns = [
          {header: "id", key: "id", width: 25},
          {header: "employee_uid", key: "employee_uid",  width: 25},
          {header: "employee_id", key: "employee_id",  width: 25},
          {header: "employee_name", key: "employee_name",  width: 25},
          {header: "dependents", key: "dependents", width: 25},
          {header: "position_name", key: "position_name", width: 25},
          {header: "departament_name", key: "departament_name", width: 25},
          {header: "salary_base", key: "salary_base", width: 25},
          {header: "salary_liquid", key: "salary_liquid", width: 25},
          {header: "month", key: "month", width: 25},
          {header: "year", key: "year", width: 25},
          {header: "total_income", key: "total_income", width: 25},
          {header: "overtime50", key: "overtime50", width: 25},
          {header: "overtime100", key: "overtime100", width: 25},
          {header: "total_overtime", key: "total_overtime", width: 25},
          {header: "month_total_workdays", key: "month_total_workdays", width: 25},
          {header: "day_total_workhours", key: "day_total_workhours", width: 25},
          {header: "base_day", key: "base_day", width: 25},
          {header: "base_hour", key: "base_hour", width: 25},
          {header: "absences", key: "absences", width: 25},
          {header: "total_absences", key: "total_absences", width: 25},
          {header: "cash_advances", key: "cash_advances", width: 25},
          {header: "bonus", key: "bonus", width: 25},
          {header: "backpay", key: "backpay", width: 25},
          {header: "irps", key: "irps", width: 25},
          {header: "inss", key: "inss", width: 25},
          ]
          
          payrolls.map((value, idx) => {
            sheet.addRow({
              id: value.id,
              employee_uid: value.employee_uid,
              employee_id: value.employee_id,
              employee_name: value.employee_name,
              dependents: value.dependents,
              position_name: value.position_name,
              departament_name: value.departament_name,
              salary_base: value.salary_base,
              salary_liquid: value.salary_liquid,
              month: value.month,
              year: value.year,
              total_income: value.total_income,
              overtime50: value.overtime50,
              overtime100: value.overtime100,
              total_overtime: value.total_overtime,
              month_total_workdays: value.month_total_workdays,
              day_total_workhours: value.day_total_workhours,
              base_day: value.base_day,
              base_hour: value.base_hour,
              absences: value.absences,
              total_absences: value.total_absences,
              cash_advances: value.cash_advances,
              bonus: value.bonus,
              backpay: value.backpay,
              irps: value.irps,
              inss_employee: value.inss_employee,
              inss_company: value.inss_company,
            });
          });
      
          sheet.getRow(1).font = {
            bold: true,
          }
          response.setHeader(
            "content-type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          )
      
          response.setHeader(
            "Content-Disposition",
            "attachment;filename=" + "exceljsExport.xlsx"
          )
          workbook.xlsx.write(response)
        } catch {
      
        }

        // return response.json(payrolls);
    }
}

export { ExportExcelPayrollController }