import { DateAt } from '../../../database/date-at.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sale } from './sales.entity';

@Entity()
export class SalesDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  quantity: number;

  @ManyToOne(() => Sale, (sale) => sale.salesDetail)
  sale: Sale;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
