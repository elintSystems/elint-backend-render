import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreatePayrollDTO2 } from "../../../dtos/ICreatePayrollDTO2";
import { IPayrollRepository } from "../../../repositories/IPayrollRepository";
import { Payroll } from "../entities/Payroll";

class PayrollRepository implements IPayrollRepository {
    private repository: Repository<Payroll>;

    constructor() {
        this.repository = AppDataSource.getRepository(Payroll);
    }
    
    async create({ id,
      employee_uid,
      employee_name,
      dependents,
      position_name,
      departament_name,
      nib,
      social_security,
      nuit,
      salary_base,
      salary_liquid,
      month,
      year,
      overtime50,
      overtime100,
      total_overtime,
      month_total_workdays,
      day_total_workhours,
      base_day,
      base_hour,
      absences,
      total_absences,
      cash_advances,
      backpay,
      subsidy,
      bonus,
      irps,
      inss_employee,
      inss_company,
      total_income}: ICreatePayrollDTO2): Promise<void> {
        const payroll =  this.repository.create({
          id,
          employee_uid,
          employee_name,
          position_name,
          dependents,
          departament_name,
          nib,
          social_security,
          nuit,
          salary_base,
          salary_liquid,
          month,
          year,
          overtime50,
          overtime100,
          total_overtime,
          month_total_workdays,
          day_total_workhours,
          base_day,
          base_hour,
          total_absences,
          absences,
          cash_advances,
          backpay,
          subsidy,
          bonus,
          irps,
          inss_employee,
          inss_company,
          total_income
        });
        
        await this.repository.save(payroll);
        
    }
    
    async findByEmployeeId(employee_uid: string): Promise<Payroll | null> {
        const payroll = await this.repository.findOne({ 
          where: { employee_uid }
         });

        return payroll;
    }

    async findById(id: string): Promise<Payroll | null> {
        const payroll = await this.repository.findOne({
          where: { id }
        });
        // console.log("ByyyyyyyyyyyyID:  ", payroll)
        return payroll;
    }

    async findByMouth(month: string): Promise<Payroll | null> {
      const  payroll = await this.repository.findOne({
        where: {month}
      })

      return payroll;
    }

    async findByYear(year: number): Promise<Payroll | null> {
      const  payroll = await this.repository.findOne({
        where: {year}
      })

      return payroll;
    }


    async findAllByYear(year: number): Promise<Payroll[] | null> {
      const  payrolls = await this.repository.find({
        where: {year}
      })

      return payrolls;
    }

    async findAllByMonth(month: string): Promise<Payroll[] | null> {
      const  payrolls = await this.repository.find({
        where: {month}
      })

      return payrolls;
    }
    async findAllByYearAndByMonth(year: number, month: string): Promise<Payroll[] | null> {
      const  payrolls = await this.repository.find({
        where: {month, year}
      })

      return payrolls;
      }
  
    async list(): Promise<Payroll[]> {
        const list = await this.repository.find();

        return list;
    }

    async delete(id: string): Promise<void> {
      await this.repository.delete(id)
    }

    async deleteAllByYearAndMonth(year: number, month: string): Promise<void> {
      await this.repository.delete({year: year, month: month})

    }
}

export { PayrollRepository };






