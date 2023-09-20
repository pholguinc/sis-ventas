import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';
import { DateAt } from '../../../database/date-at.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity';

@Entity({ name: 'products' })
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  sale: number;

  @Index()
  @Column({ type: 'int' })
  stock: number;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Brand;
  newProduct: Category;


  @ManyToMany(() => Provider, (provider) => provider.products, {
    nullable: true,
  })
  @JoinTable({
    name: 'products_provider',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'provider_id',
    },
  })
  providers: Provider[];
}
