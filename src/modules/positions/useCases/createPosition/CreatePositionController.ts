import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePositionUseCase } from "./CreatePositionUseCase";

class CreatePositionController {

    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const createPositionUseCase = container.resolve(CreatePositionUseCase);

        await createPositionUseCase.execute({ name })

        return response.status(201).send();
    }
}

export { CreatePositionController }