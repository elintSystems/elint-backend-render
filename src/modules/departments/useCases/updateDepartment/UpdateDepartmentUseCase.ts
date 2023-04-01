import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import ICreateDepartmentDTO from "../../dtos/ICreateDepartmentDTO";
import IDepartmentsRepository from "../../repositories/IDepartmentsRepository";


@injectable()
class UpdateDepartmentUseCase {
  constructor(@inject("DepartmentsRepository")
  private departmentRepository: IDepartmentsRepository) {}
  
   async execute({id, name}: ICreateDepartmentDTO) {
    const department = await this.departmentRepository.findById(id as string)

    if(!department) {
      throw new AppError("Department doesn't exists")
    }

    await this.departmentRepository.create({id, name})

    return department;
  }

}

export { UpdateDepartmentUseCase }