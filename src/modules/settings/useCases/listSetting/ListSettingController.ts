import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSettingUseCase } from "./ListSettingUseCase";


class ListSettingController {

    async handle(request: Request, response: Response) {

        const listSettingUseCase = container.resolve(ListSettingUseCase);

        const settings = await listSettingUseCase.execute()

      return response.json(settings);
    }
}

export { ListSettingController }