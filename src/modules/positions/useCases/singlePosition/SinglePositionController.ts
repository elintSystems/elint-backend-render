import { Request, Response } from "express";
import { container } from "tsyringe";
import { SinglePositionUseCase } from "./SinglePositionUseCase";

class SinglePositionController {

    async handle(request: Request, response: Response) {
        const id = request.params.id;

        const singlePositionUseCase = container.resolve(SinglePositionUseCase);

        const position = await singlePositionUseCase.execute(id)

      return response.json(position);
    }
}

export { SinglePositionController }