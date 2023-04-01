import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4  } from 'uuid';
import { Employee } from '../../../../employees/infra/typeorm/entities/Employee';

@Entity('positions')
class Position {
  @PrimaryColumn()
  id: string;

  @Column()
  position_id: number;

  @Column()
  name: string;

  total_employee: number;

  employees: Employee [];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = uuidv4();
  }

}

export default Position;
