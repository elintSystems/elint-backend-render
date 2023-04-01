import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm';
import ICreateSettingDTO from '../../../dtos/ICreateSettingDTO';
import ISettingRepository from '../../../repositories/ISettingRepository';
import Setting from '../entities/Setting';



class SettingsRepository implements ISettingRepository {
  private ormRepository: Repository<Setting>;

  constructor() {
      this.ormRepository = AppDataSource.getRepository(Setting);
  }
  
  public async create({ id,
    company_name, 
    company_telephone,
    company_contact,
    company_email,
    company_website,
    company_fax,
    company_address,
    company_province,
    company_city,
    postal_code,
    company_country,
    company_avatar,
    payroll_total_workdays_month,
    payroll_total_workhours_day,
    overtime,
    absences,
    cash_advances,
    bonus,
    backpay,
    subsidy,flag_id }: ICreateSettingDTO): Promise<Setting> {

      const setting = this.ormRepository.create({
            id,
            company_name, 
            company_telephone,
            company_contact,
            company_email,
            company_website,
            company_fax,
            company_address,
            company_province,
            company_city,
            postal_code,
            company_country,
            company_avatar,
            payroll_total_workdays_month,
            payroll_total_workhours_day, 
            overtime,
            absences,
            cash_advances,
            bonus,
            backpay,
            subsidy,flag_id
      })

      await this.ormRepository.save(setting);

      return setting;
  }
  
  async findByName(company_name: string): Promise<Setting | null> {
    const setting = await this.ormRepository.findOne({
      where: {company_name}
    })

    return setting;
  }

  async findById(flag_id: number): Promise<Setting | null> {
     const setting = await this.ormRepository.findOne({
      where: {flag_id}
    })

    return setting;
  }

  async list(): Promise<Setting | null> {
    const settings = await this.ormRepository.findOne({
      where: {flag_id: 1}
    })

    return settings;
  }
}

export default SettingsRepository
