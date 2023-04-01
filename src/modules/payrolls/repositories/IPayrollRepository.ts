import { ICreatePayrollDTO } from "../dtos/ICreatePayrollDTO";
import { ICreatePayrollDTO2 } from "../dtos/ICreatePayrollDTO2";
import { Payroll } from "../infra/typeorm/entities/Payroll";

interface IPayrollRepository {
    create(data: ICreatePayrollDTO2): Promise<void>;
    
    findByEmployeeId(employee_uid: string): Promise<Payroll | null>;
    findById(id: string): Promise<Payroll | null>;
    findByMouth(month: string): Promise<Payroll | null>;
    findByYear(year: number): Promise<Payroll | null>;
    findAllByYear(year: number): Promise<Payroll[] | null>;
    findAllByMonth(month: string): Promise<Payroll[] | null>;
    findAllByYearAndByMonth(year: number, month: string): Promise<Payroll[] | null>;
    delete(id: string): Promise<void>
    deleteAllByYearAndMonth(year: number, month: string): Promise<void>


    list(): Promise<Payroll[]>;
    
}

export { IPayrollRepository }