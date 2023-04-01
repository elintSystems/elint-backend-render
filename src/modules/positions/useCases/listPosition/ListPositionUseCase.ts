import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../repositories/IPositionsRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import ICreatePositionDTO from "../../dtos/ICreatePositionDTO";

export default interface IRequest {
  id?: string;
  position_id?: number;
  name: string;
  total_employee: number;

}


@injectable()
class ListPositionUseCase {

    constructor(@inject("PositionsRepository")
        private positionRepository: IPositionsRepository,
        
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository) {}

    async execute() {
        
        const positions = await this.positionRepository.list();
        // let positions2: IRequest[] = positions
        const listEmployee =  await this.employeeRepository.list()

        positions.map((position) => {
          position.total_employee = (listEmployee.filter(employee => {
              return employee.position_id === position.id
          })).length
          console.log(position.total_employee)
        })

        return positions;

    }
}

export { ListPositionUseCase }