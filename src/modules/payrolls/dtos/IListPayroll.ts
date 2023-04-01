
interface IListPayroll {
  id?: string;
  employee_id?: number;
  name?: string;
  dependents?: number;
  positionName?: string | null;
  departamentsName?: string | null;
  salary_base?: number | string;
  salary_liquid?: number | string;
  month?: number;
  year?: number;
  overtime50?: number;
  overtime100?: number;
  month_total_workdays?: number;
  day_total_workhours?: number;
  absences?: number;
  cash_advances?: number;
  backpay?: number;
  subsidy?: number;
  bonus?: number;
  IRPS?: number | string;
  INSS?: number | string;
  total_income?: number | string

}

export { IListPayroll };