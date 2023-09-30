import { Product } from '../../products/entities/product.entity';
import { DateAt } from '../../../database/date-at.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'providers' })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 11 })
  ruc: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 9 })
  phone: string;

  @Column({ type: 'varchar' })
  address: string;

  /*@OneToMany(() => Product, (product) => product.providers)
  products: Product[];*/

  @ManyToMany(() => Product, (product) => product.providers)
  products: Product[];

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
