import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { departmentRouter } from "./department.routes";
import { employeeRouter } from "./employee.routes";
import { payrollRouter } from "./payroll.routes";
import { positionRouter } from "./position.routes";
import { settingRouter } from "./setting.routes";
import { userRouter } from "./user.routes";


const routes = Router();

routes.use("/users", userRouter)
routes.use("/employees", employeeRouter)
routes.use("/payrolls", payrollRouter)
routes.use("/departments", departmentRouter)
routes.use("/positions", positionRouter)
routes.use("/settings", settingRouter)
routes.use(authenticateRoutes)



export default routes;