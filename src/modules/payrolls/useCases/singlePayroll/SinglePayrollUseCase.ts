import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import { IPayrollDemo, ISalario } from "../ListOutputPayroll/OutputPayrollUseCase";

interface ICreatePayrollDTO2 {
  id?: string;
  employee_uid?: string;
  employee_id?: number;
  employee_name?: string;
  dependents?: number;
  position_name?: string;
  departament_name?: string;
  nib?: number,
  nuit?: number,
  social_security?: number,
  vacation?: number,
  salary_base?: string;
  salary_liquid?: string;
  month?: string;
  year?: number;
  overtime50?: number;
  overtime100?: number;
  totalOvertime50?: number;
  totalOvertime100?: number;
  total_overtime?: string;
  month_total_workdays?: number;
  day_total_workhours?: number;
  base_day?: string;
  base_hour?: string;
  absences?: number;
  total_absences?: string;
  cash_advances?: string;
  backpay?: string;
  subsidy?: string;
  bonus?: string;
  irps?:  string;
  inss?: string;
  inss_employee?: string;
  inss_company?: string;
  total_income?: string;
  tabelaSalario?: ISalario;
  payrollDemo?: IPayrollDemo;
}



@injectable()
class SinglePayrollUseCase {

    constructor(@inject("PayrollRepository")
    private payrollRepository: IPayrollRepository,
      
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("PositionsRepository")
        private positionsRepository: IPositionsRepository,

        @inject("DepartmentsRepository")
        private departmentsRepository: IDepartmentsRepository) {}

    async execute(id: string) {
        
        const payroll = await this.payrollRepository.findById(id);
        //  console.log("SIngle UseCase: ", payroll)

        if (!payroll) {
          throw new AppError("Payroll doesn't exists")
        }
        const employee = await this.employeeRepository.findById(payroll.employee_uid)

        // if(!employee) {
        //   throw new AppError("Employee doesn't exists")
        // }

       

        if(employee) {
          const positionName = await this.positionsRepository.findById(employee.position_id)
          const departmentName = await this.departmentsRepository.findById(employee.department_id)

          let employeePayroll: ICreatePayrollDTO2 = {
            id: payroll.id,
            employee_uid: employee.id,
            employee_id: employee.employee_id,
            employee_name: employee.name,
            dependents: employee.dependents,
            position_name: positionName?.name,
            departament_name: departmentName?.name,
            nib: employee.nib,
            nuit: employee.nuit,
            social_security: employee.social_security,
            vacation: employee.vacation,
            salary_base: payroll.salary_base, 
            salary_liquid: payroll.salary_liquid,
            month: payroll.month,
            year: payroll.year,
            total_income: payroll.total_income ,
            overtime50: payroll.overtime50,
            totalOvertime50: payroll.overtime50 * (+payroll.base_hour) * 1.5,
            overtime100: payroll.overtime100,
            totalOvertime100: payroll.overtime100 * (+payroll.base_hour) * 2,
            total_overtime: payroll.total_overtime,
            month_total_workdays: payroll.month_total_workdays,
            day_total_workhours: payroll.day_total_workhours,
            base_day: payroll.base_day,
            base_hour: payroll.base_hour,
            absences: payroll.absences,
            total_absences: payroll.total_absences as any,
            cash_advances: payroll.cash_advances,
            subsidy: payroll.subsidy,
            bonus: payroll.bonus,
            backpay: payroll.backpay,
            irps: payroll.irps,
            inss_employee: payroll.inss_employee,
            inss_company: payroll.inss_company,
            tabelaSalario: payroll.tabelaSalario,
            payrollDemo: payroll.payrollDemo
          };
        return employeePayroll;

      } else {
        let employeePayroll: ICreatePayrollDTO2 = {
          id: payroll.id,
          employee_uid: null as any,
          employee_id: null as any,
          employee_name: payroll.employee_name,
          dependents: payroll.dependents,
          position_name: payroll.position_name,
          departament_name: payroll.departament_name,
          nib: payroll.nib,
          nuit: payroll.nuit,
          social_security: payroll.nuit,
          vacation: 0,
          salary_base: payroll.salary_base, 
          salary_liquid: payroll.salary_liquid,
          month: payroll.month,
          year: payroll.year,
          total_income: payroll.total_income ,
          overtime50: payroll.overtime50,
          totalOvertime50: payroll.overtime50 * (+payroll.base_hour) * 1.5,
          overtime100: payroll.overtime100,
          totalOvertime100: payroll.overtime100 * (+payroll.base_hour) * 2,
          total_overtime: payroll.total_overtime,
          month_total_workdays: payroll.month_total_workdays,
          day_total_workhours: payroll.day_total_workhours,
          base_day: payroll.base_day,
          base_hour: payroll.base_hour,
          absences: payroll.absences,
          total_absences: payroll.total_absences as any,
          cash_advances: payroll.cash_advances,
          subsidy: payroll.subsidy,
          bonus: payroll.bonus,
          backpay: payroll.backpay,
          irps: payroll.irps,
          inss_employee: payroll.inss_employee,
          inss_company: payroll.inss_company,
          tabelaSalario: payroll.tabelaSalario,
          payrollDemo: payroll.payrollDemo
        };
      return employeePayroll;

      }

        // horasExtras50 = horasExtras50 * salarioPorHora * 1.5
        // horasExtras100 = horasExtras100 * salarioPorHora * 2

               
       

        

    }
}

export { SinglePayrollUseCase }