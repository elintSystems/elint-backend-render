import "./provider/index"
import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IEmployeesRepository } from "../../modules/employees/repositories/IEmployeesRepository";
import { EmployeesRepository } from "../../modules/employees/infra/typeorm/repositories/EmployeesRepository";
import IDepartmentsRepository from "../../modules/departments/repositories/IDepartmentsRepository";
import DepartmentsRepository from "../../modules/departments/infra/typeorm/repositories/DepartmentsRepository";
import IPositionsRepository from "../../modules/positions/repositories/IPositionsRepository";
import PositionsRepository from "../../modules/positions/infra/typeorm/repositories/PositionsRepository";
import { PayrollRepository } from "../../modules/payrolls/infra/typeorm/repositories/PayrollRepository";
import { IPayrollRepository } from "../../modules/payrolls/repositories/IPayrollRepository";
import ISettingRepository from "../../modules/settings/repositories/ISettingRepository";
import SettingsRepository from "../../modules/settings/infra/typeorm/repositories/SettingsRepository";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IEmployeesRepository>(
  "EmployeesRepository",
  EmployeesRepository
)

container.registerSingleton<IPayrollRepository>(
  "PayrollRepository",
  PayrollRepository
)

container.registerSingleton<IDepartmentsRepository>(
  "DepartmentsRepository",
  DepartmentsRepository
)

container.registerSingleton<IPositionsRepository>(
  "PositionsRepository",
  PositionsRepository
)

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)

container.registerSingleton<ISettingRepository>(
  "SettingsRepository",
  SettingsRepository
)


