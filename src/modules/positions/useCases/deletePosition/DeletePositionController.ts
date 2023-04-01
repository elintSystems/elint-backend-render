import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePositionUseCase } from "./DeletePositionUseCase";

class DeletePositionController {

    async handle(request: Request, response: Response) {
        const id = request.params.id;

        const deletePositionUseCase = container.resolve(DeletePositionUseCase);

        const position = await deletePositionUseCase.execute(id)

      return response.json(position);
    }
}

export { DeletePositionController }