import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../repositories/IPositionsRepository";

@injectable()
class DeletePositionUseCase {

    constructor(@inject("PositionsRepository")
        private positionRepository: IPositionsRepository) {}

    async execute(id: string) {
        
        const position = await this.positionRepository.findById(id);

        if(!position) {
          throw new AppError("Position doesn't exists")
        }

        this.positionRepository.delete(id)

        return position;

    }
}

export { DeletePositionUseCase }