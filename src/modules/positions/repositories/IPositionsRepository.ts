import ICreatePositionDTO from "../dtos/ICreatePositionDTO";
import Position from "../infra/typeorm/entities/Position";

export default interface IPositionsRepository {
  create( data: ICreatePositionDTO): Promise<Position>;
  findByName(name: string): Promise<Position | null>;
  findById(id: string): Promise<Position | null>;
  list(): Promise<Position[] | []>;
  delete(id: string): Promise<void>
}
