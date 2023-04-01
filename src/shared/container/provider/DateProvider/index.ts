import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";
import "dotenv/config"

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)