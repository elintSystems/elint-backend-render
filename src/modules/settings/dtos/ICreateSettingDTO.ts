export default interface ICreateSettingDTO {
  id?: string;
  company_name?: string;
  company_telephone?: number;
  company_contact?: number;
  company_email?: string;
  company_website?: string;
  company_fax?: string;
  company_address?: string;
  company_province?: string;
  company_city?: string;
  postal_code?: number
  company_country?: string;
  company_avatar?: string
  payroll_total_workdays_month?: number;
  payroll_total_workhours_day?: number;
  overtime?: string
  absences?: string
  cash_advances?: string
  bonus?: string
  backpay?: string
  subsidy?: string
  flag_id?: number;
}


// "company_name"
// "telephone""contact""email""website""fax""company_address""company_province"
// "company_city""postal_code""company_country"
// "avatar""total_month_workdays""total_day_workhours"