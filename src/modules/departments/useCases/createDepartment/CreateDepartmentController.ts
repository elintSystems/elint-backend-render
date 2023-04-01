import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDepartmentUseCase } from "./CreateDepartmentUseCase";

class CreateDepartmentController {

    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const createDepartmentUseCase = container.resolve(CreateDepartmentUseCase);

        await createDepartmentUseCase.execute({ name })

        return response.status(201).send();
    }
}

export { CreateDepartmentController }