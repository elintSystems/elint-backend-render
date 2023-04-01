import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../repositories/IPositionsRepository";

@injectable()
class SinglePositionUseCase {

    constructor(@inject("PositionsRepository")
        private positionRepository: IPositionsRepository) {}

    async execute(id: string) {
        
        const position = await this.positionRepository.findById(id);

        return position;

    }
}

export { SinglePositionUseCase }