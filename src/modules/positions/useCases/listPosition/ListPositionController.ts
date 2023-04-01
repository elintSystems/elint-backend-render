import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPositionUseCase } from "./ListPositionUseCase";

class ListPositionController {

    async handle(request: Request, response: Response) {

        const listPositionUseCase = container.resolve(ListPositionUseCase);

        const positions = await listPositionUseCase.execute()

      return response.json(positions);
    }
}

export { ListPositionController }