import { Router } from "express";
import { UpdateDepartmentController } from "../../../../modules/departments/useCases/updateDepartment/UpdateDepartmentController";
import { CreatePositionController } from "../../../../modules/positions/useCases/createPosition/CreatePositionController";
import { DeletePositionController } from "../../../../modules/positions/useCases/deletePosition/DeletePositionController";
import { ListPositionController } from "../../../../modules/positions/useCases/listPosition/ListPositionController";
import { SinglePositionController } from "../../../../modules/positions/useCases/singlePosition/SinglePositionController";
import { UpdatePositionController } from "../../../../modules/positions/useCases/updatePosition/UpdatePositionController";

const positionRouter = Router();
const listPositionController = new ListPositionController();
const createPositionController = new CreatePositionController();
const singlePositionController = new SinglePositionController()
const deletePositionController = new DeletePositionController()
const updatePositionController = new UpdatePositionController()

positionRouter.post("/", createPositionController.handle);

positionRouter.get("/", listPositionController.handle);

positionRouter.get("/:id", singlePositionController.handle);

positionRouter.delete("/:id", deletePositionController.handle)

positionRouter.put("/:id", updatePositionController.handle)




export { positionRouter };
