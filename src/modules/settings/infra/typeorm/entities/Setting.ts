import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4  } from 'uuid';

@Entity('settings')
class Setting {
  @PrimaryColumn()
  id: string;

  @Column()
  company_name: string;

  @Column()
  company_telephone: number;

  @Column()
  company_contact: number;

  @Column()
  company_email: string;

  @Column()
  company_website: string;

  @Column()
  company_fax: string;

  @Column()
  company_address: string;

  @Column()
  company_province: string;
  
  @Column()
  company_city: string;
  
  @Column()
  postal_code: number
  
  @Column()
  company_country: string;
  
  @Column()
  company_avatar: string

  @Column()
  payroll_total_workdays_month: number;
  
  @Column()
  payroll_total_workhours_day: number;

  @Column()
  overtime: string

  @Column()
  absences: string

  @Column()
  cash_advances: string

  @Column()
  bonus: string

  @Column()
  backpay: string

  @Column()
  subsidy: string

  @Column()
  flag_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = uuidv4();
  }

}

export default Setting;

