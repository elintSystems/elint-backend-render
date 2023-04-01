import { ISalario, IPayrollDemo } from "../useCases/listPayroll/ListPayrollUseCase";

interface ICreatePayrollDTO {
  id?: string;
  employee_uid?: string;
  employee_id?: number;  
  employee_name?: string;
  dependents?: number;
  position_name?: string;
  departament_name?: string;
  salary_base?: string;
  salary_liquid?: string;
  month?: string;
  year?: number;
  overtime50?: number;
  overtime100?: number;
  total_overtime?: string;
  month_total_workdays?: number;
  day_total_workhours?: number;
  base_day?: string,
  base_hour?: string,
  absences?: number;
  total_absences?: string;
  cash_advances?: string;
  backpay?: string;
  subsidy?: string;
  bonus?: string;
  IRPS?: string;
  INSS?: string;
  total_income?: string;
  tabelaSalario?: ISalario;
  payrollDemo?: IPayrollDemo;
}

export { ICreatePayrollDTO };



// interface ICreatePayrollDTO {
//   id: string;
//   employee_id?: string;
//   dependents?: number;
//   positionName?: string | null;
//   departamentsName?: string | null;
//   salary_base?: number | string;
//   salary_liquid?: number | string;
//   month?: number;
//   year?: number;
//   overtime50?: number;
//   overtime100?: number;
//   month_total_workdays?: number;
//   day_total_workhours?: number;
//   absences?: number;
//   cash_advances?: number;
//   backpay?: number;
//   bonus?: number;
//   IRPS?: number | string;
//   INSS?: number | string;
//   total_income?: number | string
//   tabelaSalario?: ISalario;
//   payrollDemo?: IPayrollDemo;
// }

// export { ICreatePayrollDTO };