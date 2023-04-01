import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";
import { Payroll } from "../../infra/typeorm/entities/Payroll";
import { ICreatePayrollDTO2 } from "../../dtos/ICreatePayrollDTO2";

export interface ISalario {
  salarioLiquido?: number;
  coeficiente: number;
  limiteNTributavel: number ;
  AResult?: number;
  AxB?: number;
  valorReter?: number;
  impostoPagarIRPS?: number;
}

export interface IPayrollDemo {
  overtime50?: number;
  overtime100?: number;
  month_total_workdays?: number;
  day_total_workhours?: number;
  totalAbsences?: number;
  cash_advances?: number;
  backpay?: number;
  bonus?: number;
  total_income?: number;
  salary_liquid?: number;
  IRPS?: number;
  INSS?: number
}

interface IRequestList {
  id?: string;
  employee_id?: number;
  name?: string;
  dependents?: number;
  positionName?: string | null;
  departamentsName?: string | null;
  salary_base?: number | string;
  salary_liquid?: number | string;
  month?: string;
  year?: number;
  overtime50?: number;
  overtime100?: number;
  month_total_workdays?: number;
  day_total_workhours?: number;
  absences?: number;
  cash_advances?: number;
  backpay?: number;
  bonus?: number;
  IRPS?: number | string;
  INSS?: number | string;
  total_income?: number | string
  tabelaSalario?: ISalario;
  payrollDemo?: IPayrollDemo;
}


@injectable()
class InputPayrollUseCase {

    constructor(@inject("PayrollRepository")
    private payrollRepository: IPayrollRepository,
      
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("PositionsRepository")
        private positionsRepository: IPositionsRepository,

        @inject("DepartmentsRepository")
        private departmentsRepository: IDepartmentsRepository
        ) {}

    async execute({ id, overtime50, overtime100,
                    absences, bonus, cash_advances, backpay}: IRequestList) {
        const listEmployeesPayrolls: ICreatePayrollDTO2[] = [];
        // let employeePayroll: ICreatePayrollTO = {}
        const payrolls = await this.payrollRepository.list()
        const employees = await this.employeeRepository.list();
        const positions = await this.positionsRepository.list()
        const departments = await this.departmentsRepository.list()   
        const payroll = await this.payrollRepository.findById(id as string);
        
        if(!payroll) {
          throw new AppError("Payroll doesn't exists")
        }

        if (absences! >= 0)
          absences = absences //absences = absences ?? +payroll.absences 
        else
          absences = +payroll.absences 
        if (overtime50! >= 0) 
          overtime50 = overtime50
        else 
          overtime50 = +payroll.overtime50
        if (overtime100! >= 0) 
          overtime100 = overtime100
        else 
          overtime100 = +payroll.overtime100
        if (cash_advances! >= 0) 
          cash_advances = cash_advances
        else 
          cash_advances = +payroll.cash_advances
        if (backpay! >= 0) 
          backpay = backpay
        else 
          backpay = +payroll.backpay
        if (bonus! >= 0) 
          bonus = bonus
        else 
          bonus = +payroll.bonus
  
          // console.log("auauauauau"+absences)
        if(employees.length <= 0) {
            throw new AppError("Employees Doesn't Exists");
        }

        function positionName(positionId: string) {
          return positions.find((position) => position.id === positionId)
        }

        function departmentName(departmentId: string) {
          return departments.find((department) => department.id === departmentId)
        }

        const employee =  employees.find(employee => employee.id === payroll.employee_uid)
          // console.log(employee)
        if(employee) {

          let base_day = calcSalarioEmDias(payroll.month_total_workdays, +employee.salary)
          let base_hour = calcSalarioPorHora(base_day, payroll.day_total_workhours)
          let total_overtime = calcTotalHorasExtras(base_hour, overtime50!, overtime100!)
          let total_absences = calcTotalFaltas(absences!, base_day)
          // let total_income = +calcTotalSalario(+employee.salary, total_overtime!, total_absences, +cash_advances!, +backpay!, +employee.bonus).toFixed(2)
          let total_income = +calcularSalarioBruto(+employee.salary, total_overtime!, total_absences, +backpay!, +bonus!, +employee.subsidy,).toFixed(2)
          let IRPS = retornarIRPS(+total_income!, employee.dependents) 
          let INSS = retornarINSS(+total_income!)
          let INSS_Company = retornarINSS_Company(+total_income)
          let salary_liquid = calcularSalarioLiquido(+total_income!, IRPS, INSS, +cash_advances!)
          // console.log(parseFloat(employee.salary).toFixed(2))
          // console.log((+employee.salary).toFixed(2))
          
         let employeePayroll: ICreatePayrollDTO2 = {
            id: payroll.id,
            employee_uid: employee.id,
            employee_name: employee.name,
            dependents: employee.dependents,
            position_name: positionName(employee.position_id!)?.name,
            departament_name: departmentName(employee.department_id!)?.name,
            nib: employee.nib,
            social_security: employee.social_security,
            nuit: employee.nuit,
            salary_base: employee.salary, 
            salary_liquid: salary_liquid as any,
            month: payroll.month,
            year: payroll.year,
            total_income: total_income  as any,
            overtime50,
            overtime100,
            total_overtime: total_overtime as any, //((+payroll.total_overtime) + total_overtime) as any,
            month_total_workdays: payroll.month_total_workdays,
            day_total_workhours: payroll.day_total_workhours,
            base_day: base_day as any,
            base_hour: base_hour as any,
            absences,
            total_absences: total_absences as any,
            cash_advances: cash_advances as any,
            subsidy: employee.subsidy,
            bonus: bonus as any,
            backpay: backpay as any,
            irps: IRPS as any,
            inss_employee: retornarINSS(total_income) as any,
            inss_company: INSS_Company as any,
            tabelaSalario: retornarTabela(+total_income!, employee.dependents),
            payrollDemo: retornarPayrollDemo(+employee.salary, overtime50,
              overtime100, payroll.month_total_workdays, payroll.day_total_workhours, absences,
              +cash_advances!, +backpay!, +employee.subsidy, +bonus!, +total_income!, +IRPS!, +INSS!)
          };

          //salvar no banco de dados
          this.payrollRepository.create(employeePayroll).then().
          catch((err) => console.log(err))
          
          listEmployeesPayrolls.push(employeePayroll)
          console.log(listEmployeesPayrolls)
        }
        return listEmployeesPayrolls
    }
}

function calcularSalario(salary: number, dependents: number) {
  let coeficiente = CalcCoeficiente(salary)
  let limiteNTributavel = CalcLimiteNaoTributavel(salary)
  let AResult = salary - limiteNTributavel!
  let AxB = AResult * coeficiente!
  let valorReter = CalcValorReter(limiteNTributavel!, dependents)
  let impostoPagarIRPS = calcImpostoPagarIRPS(AxB, valorReter!)
  let salarioLiquido = salary - impostoPagarIRPS - (salary * 0.03)
  
  return salarioLiquido;
}

function retornarTabela(salary: number, dependents: number) {
  let coeficiente = CalcCoeficiente(salary)
  let limiteNTributavel = CalcLimiteNaoTributavel(salary)
  let AResult = salary - limiteNTributavel!
  let AxB = AResult * coeficiente!
  let valorReter = CalcValorReter(limiteNTributavel!, dependents)
  let impostoPagarIRPS = calcImpostoPagarIRPS(AxB, valorReter!)
  let salarioLiquido = calcularSalario(salary, impostoPagarIRPS)

  const salario: ISalario = {
    coeficiente:  coeficiente!,
    limiteNTributavel: limiteNTributavel!,
    AResult: AResult,
    AxB: AxB,
    valorReter: valorReter!,
    impostoPagarIRPS: impostoPagarIRPS,
    salarioLiquido: salarioLiquido

  }
  
  return salario;
}

function retornarIRPS(salary: number, dependents: number) {
  let coeficiente = CalcCoeficiente(salary)
  let limiteNTributavel = CalcLimiteNaoTributavel(salary)
  let AResult = salary - limiteNTributavel!
  let AxB = AResult * coeficiente!
  let valorReter = CalcValorReter(limiteNTributavel!, dependents)
  let impostoPagarIRPS = calcImpostoPagarIRPS(AxB, valorReter!)
  
  return impostoPagarIRPS;
}
function retornarINSS(salary: number) {
  return salary * 0.03;
}

function retornarINSS_Company(salary: number) {
  return salary * 0.04;
}

function retornarPayrollDemo(salary_base: number,  overtime50?: number,
  overtime100?: number,
  month_total_workdays?: number,
  day_total_workhours?: number,
  totalAbsences?: number,
  cash_advances?: number,
  backpay?: number,
  bonus?: number,
  subsidy?: number,
  salary_liquid?: number,
  IRPS?: number,
  INSS?: number) {
  let daySalary = calcSalarioEmDias(month_total_workdays!, salary_base)
  let hourSalary = calcSalarioPorHora(daySalary, day_total_workhours!)
  overtime50 = calcTotalHoraExtra50(hourSalary, overtime50!)
  overtime100 = calcTotalHoraExtra100(hourSalary, overtime100!)
  totalAbsences = calcTotalFaltas(totalAbsences!, daySalary)
  cash_advances = cash_advances
  subsidy = subsidy
  let totalSalario = +calcularSalarioBruto(salary_base, overtime100 + overtime50 , totalAbsences, backpay!, bonus!, subsidy!).toFixed(2)
  salary_liquid = calcularSalario(totalSalario, IRPS!)
  backpay = backpay
  bonus = bonus
  // IRPS = IRPS

 

  const salario: IPayrollDemo = {
    overtime50,
    overtime100,
    month_total_workdays,
    day_total_workhours,
    totalAbsences,
    cash_advances,
    backpay,
    bonus,
    salary_liquid,
    IRPS,
    INSS

  }
  
  return salario;
}

function CalcCoeficiente (salary: number) {
  if (salary <= 20249.99) 
    return 0;
  if (salary < 20750)
    return 0.1;
  if (salary < 21000)
    return 0.1;
  if (salary < 21250)
    return 0.1;
  if (salary < 21750)
    return 0.1;
  if (salary < 22250)
    return 0.1;
  if (salary < 32750)
    return 0.15;
  if (salary < 60750)
    return 0.2;
  if (salary < 144750)
    return 0.25;
  if (salary >= 144750)
    return 0.32;
  
   return null
}

function CalcLimiteNaoTributavel(salary: number) {
  if (salary <= 20249.99) 
    return 20249.99;
  if (salary < 20750)
    return 20250;
  if (salary < 21000)
    return 20750;
  if (salary < 21250)
    return 21000;
  if (salary < 21750)
    return 21250;
  if (salary < 22250)
    return 21750;
  if (salary < 32750)
    return 22250;
  if (salary < 60750)
    return 32750;
  if (salary < 144750)
    return 60750;
  if (salary >= 144750)
    return 144750;
  
  return null
}

function CalcValorReter(LimiteNTributavel: number, dependents: number) {
  if (LimiteNTributavel == 20249.99) 
    return 0;
  if (LimiteNTributavel == 20250)
    return 0;
  if (LimiteNTributavel == 20750) {
    if(dependents == 0)
      return 50;
    else 
      return 0
    } 
  if (LimiteNTributavel == 21000) {
    if(dependents == 0)
      return 75;
    if(dependents == 1)
      return 25;
    else 
      return 0;
  }
  if (LimiteNTributavel == 21250) {
    if(dependents == 0)
      return 100;
    if(dependents == 1)
      return 50;
    if(dependents == 2)
      return 25;
    else 
      return 0;
  }
  if (LimiteNTributavel == 21750) {
    if(dependents == 0)
      return 150;
    if(dependents == 1)
      return 100;
    if(dependents == 2)
      return 75;
    if(dependents == 3)
      return 50;
    else 
      return 0;
  }
  if (LimiteNTributavel == 22250) {
    if(dependents == 0)
    return 200;
    if(dependents == 1)
      return 150;
    if(dependents == 2)
      return 125;
    if(dependents == 3)
      return 100;
    if(dependents == 4)
      return 50;
    else 
      return 50;
  }
  if (LimiteNTributavel == 32750) {
    if(dependents == 0)
    return 1775;
    if(dependents == 1)
      return 1725;
    if(dependents == 2)
      return 1700;
    if(dependents == 3)
      return 1675;
    if(dependents == 4)
      return 1625;
    else 
      return 1625;
  }
  if (LimiteNTributavel == 60750) {
    if(dependents == 0)
    return 7375;
    if(dependents == 1)
      return 7325;
    if(dependents == 2)
      return 7300;
    if(dependents == 3)
      return 7275;
    if(dependents == 4)
      return 7225;
    else 
      return 7225;
  }
  if (LimiteNTributavel == 144750) {
    if(dependents == 0)
      return 28375;
    if(dependents == 1)
      return 28325;
    if(dependents == 2)
      return 28300;
    if(dependents == 3)
      return 28275;
    if(dependents == 4)
      return 28225;
    else 
      return 28225;
  }
  return  null
}

function calcImpostoPagarIRPS(axb: number, valorReter: number) {
  return axb + valorReter
}

function calcSalarioEmDias(totalDiasTrabalhoMes: number, salario_base: number) {
  return salario_base / totalDiasTrabalhoMes
}

function calcSalarioPorHora(salarioEmDias: number, totalHorasTrabalhoDia: number) {
  return salarioEmDias / totalHorasTrabalhoDia
}

function calcTotalHoraExtra50(salarioPorHora: number, horasExtras50: number) {
  return  horasExtras50 * salarioPorHora * 1.5
}
function calcTotalHoraExtra100(salarioPorHora: number, horasExtras100: number) {
  return  horasExtras100 * salarioPorHora * 2
}
function calcTotalHorasExtras(salarioPorHora: number, horasExtras50: number, horasExtras100: number) {
  horasExtras50 = horasExtras50 * salarioPorHora * 1.5
  horasExtras100 = horasExtras100 * salarioPorHora * 2
  return horasExtras50 + horasExtras100;
}

function calcTotalFaltas(faltas: number, salarioEmDias: number) {
    return faltas * salarioEmDias
}

function calcularSalarioBruto(salario_base: number, totalHorasExtras: number,
   totalDescontoFaltas: number,  totalRetroativos: number, bonus: number, subsidio: number) {
    
  return salario_base + totalHorasExtras - totalDescontoFaltas + totalRetroativos + bonus + subsidio;
}

function calcularSalarioLiquido(totalSalario: number, IRPS: number, INSS_Employee: number, totalAdiantamento: number) {
  return totalSalario - IRPS - INSS_Employee - totalAdiantamento;
}


export { InputPayrollUseCase }

