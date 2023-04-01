import { Router } from "express";
import { CreateSettingController } from "../../../../modules/settings/useCases/createSetting/CreateSettingController";
import { ListSettingController } from "../../../../modules/settings/useCases/listSetting/ListSettingController";

const settingRouter = Router();
const createSettingController = new CreateSettingController();
const listSettingController = new ListSettingController()
// const updatePositionController = new UpdatePositionController()

settingRouter.post("/", createSettingController.handle);
settingRouter.get('/', listSettingController.handle)

// settingRouter.put("/:id", updatePositionController.handle)




export { settingRouter };
