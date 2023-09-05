import { DateAt } from '../../../database/date-at.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'settings' })
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 11, unique: true })
  ruc: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  igv: number;

  @Column({ type: 'int' })
  phone: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  domain: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
