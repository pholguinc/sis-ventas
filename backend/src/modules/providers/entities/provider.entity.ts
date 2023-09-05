import { DateAt } from '../../../database/date-at.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'providers' })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 11 })
  ruc: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar', length: 9 })
  phone: string;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
