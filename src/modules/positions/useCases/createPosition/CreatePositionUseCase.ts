import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import ICreatePositionDTO from "../../dtos/ICreatePositionDTO";

import IPositionsRepository from "../../repositories/IPositionsRepository";


@injectable()
class CreatePositionUseCase {

    constructor(@inject("PositionsRepository")
        private positionsRepository: IPositionsRepository) {}

    async execute({ name }: ICreatePositionDTO) {
        
        const positionAlreadyExists = await this.positionsRepository.findByName(name);

        if(positionAlreadyExists) {
            throw new AppError("Position Already Exists");
        }
        await this.positionsRepository.create({ name });

    }
}

export { CreatePositionUseCase }