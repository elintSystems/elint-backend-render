import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import ICreatePositionDTO from "../../dtos/ICreatePositionDTO";
import IPositionsRepository from "../../repositories/IPositionsRepository";


@injectable()
class UpdatePositionUseCase {
  constructor(@inject("PositionsRepository")
        private positionRepository: IPositionsRepository) {}
  
   async execute({id, name}: ICreatePositionDTO) {
    const position = await this.positionRepository.findById(id as string)

    if(!position) {
      throw new AppError("Position doesn't exists")
    }

    await this.positionRepository.create({id, name})

    return position;
  }

}

export { UpdatePositionUseCase }