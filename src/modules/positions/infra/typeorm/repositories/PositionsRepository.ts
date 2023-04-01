import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm';
import ICreatePositionDTO from '../../../dtos/ICreatePositionDTO';
import IPositionsRepository from '../../../repositories/IPositionsRepository';
import Position from '../entities/Position';


class PositionsRepository implements IPositionsRepository {
  private ormRepository: Repository<Position>;

  constructor() {
      this.ormRepository = AppDataSource.getRepository(Position);
  }
  
  public async create({ id, position_id, name }: ICreatePositionDTO): Promise<Position> {

      const position = this.ormRepository.create({
        id,
        position_id,
        name
      })

      await this.ormRepository.save(position);

      return position;
  }

  public async findByName(name: string): Promise<Position | null> {
       const findPosition = await this.ormRepository.findOne({
      where: { name }
    });

    return findPosition;
  }

  public async findById(id: string): Promise<Position | null> {
    const findPosition = await this.ormRepository.findOne({
   where: { id }
 });

 return findPosition;
}

  async list(): Promise<Position[] | []> {
    const list = await this.ormRepository.find();

        return list;
  }

  async delete(id: string) {
    await this.ormRepository.delete(id)
  }
}

export default PositionsRepository
