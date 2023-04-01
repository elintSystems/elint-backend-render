import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import ISettingRepository from "../../repositories/ISettingRepository";


@injectable()
class ListSettingUseCase {

    constructor(@inject("SettingsRepository")
        private tettingsRepository: ISettingRepository) {}
       
    async execute() {
    
        const users = await this.tettingsRepository.list();
  
        return users;

    }
}

export { ListSettingUseCase }

