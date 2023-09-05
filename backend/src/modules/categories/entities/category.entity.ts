import { Product } from '../../products/entities/product.entity';
import { DateAt } from '../../../database/date-at.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
