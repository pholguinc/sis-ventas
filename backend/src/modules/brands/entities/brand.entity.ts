import { Product } from '../../products/entities/product.entity';
import { DateAt } from '../../../database/date-at.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  code: string;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
