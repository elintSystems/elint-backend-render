import { Router } from "express";
import { CreateDepartmentController } from "../../../../modules/departments/useCases/createDepartment/CreateDepartmentController";
import { DeleteDepartmentController } from "../../../../modules/departments/useCases/deleteDepartment/DeleteDepartmentController";
import { ListDepartmentController } from "../../../../modules/departments/useCases/listDepartment/ListDepartmentController";
import { SingleDepartmentController } from "../../../../modules/departments/useCases/singleDepartment/SingleDepartmentController";
import { UpdateDepartmentController } from "../../../../modules/departments/useCases/updateDepartment/UpdateDepartmentController";
import { CreateEmployeeController } from "../../../../modules/employees/useCases/createEmployee/CreateEmployeeController";
import { ListEmployeeController } from "../../../../modules/employees/useCases/listEmployee/ListEmployeeController";
import { SingleEmployeeController } from "../../../../modules/employees/useCases/singleEmployee/SingleEmployeeController";

const departmentRouter = Router();
const listDepartmentController = new ListDepartmentController();
const createDepartmentController = new CreateDepartmentController();
const singleDepartmentController = new SingleDepartmentController()
const deleteDepartmentController = new DeleteDepartmentController()
const updateDepartmentController= new UpdateDepartmentController()

departmentRouter.post("/", createDepartmentController.handle);

departmentRouter.get("/", listDepartmentController.handle);

departmentRouter.get("/:id", singleDepartmentController.handle);

departmentRouter.delete("/:id", deleteDepartmentController.handle);

departmentRouter.put("/:id", updateDepartmentController.handle)


export { departmentRouter };
