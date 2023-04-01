import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDepartmentUseCase } from "../listDepartment/ListDepartmentUseCase";
import { DeleteDepartmentUseCase } from "./DeleteDepartmentUseCase";

class DeleteDepartmentController {

    async handle(request: Request, response: Response) {
        const id = request.params.id;
        
        const deleteDepartmentUseCase = container.resolve(DeleteDepartmentUseCase);

        const department = await deleteDepartmentUseCase.execute(id)

      return response.json(department);
    }
}

export { DeleteDepartmentController }