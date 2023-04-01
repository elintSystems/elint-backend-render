import ICreateSettingDTO from "../dtos/ICreateSettingDTO";
import Setting from "../infra/typeorm/entities/Setting";

export default interface ISettingRepository {
  create( data: ICreateSettingDTO): Promise<Setting>;
  findByName(company_name: string): Promise<Setting | null>
  findById(id: number): Promise<Setting | null>
  list(): Promise<Setting | null>

}
