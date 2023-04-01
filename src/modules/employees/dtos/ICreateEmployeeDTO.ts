interface ICreateEmployeeDTO {
  id?: string;
  employee_id?: number;
  name: string;
  salary: string;
  dependents: number;
  position_id?: string;
  department_id?: string; 
  birth_date?: Date;
  place_birth?: string;
  nationality?:  string;
  bi?: string;
  marital_status?: string;
  gender?: string;
  address?: string;
  contact?:  number;
  contact2?: number;
  email?: string;
  nuit?: number;
  vacation?: number;
  subsidy?:  string;
  department?: string;
  position?: string;
  start_date?: Date;
  employee_status?: string;
  bank_name?: string;
  bank_account?: number;
  nib?: number;
  social_security?: number;
}

export { ICreateEmployeeDTO };