import { DateAt } from '../../../database/date-at.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sku' })
export class Sku {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
