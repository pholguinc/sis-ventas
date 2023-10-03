import { Product } from '../../products/entities/product.entity';
import { Sale } from '../../sales/entities/sales.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SalesDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  quantity: number;

  @ManyToOne(() => Sale, (sale) => sale.salesDetails)
  @JoinColumn({ name: 'sale_id' })
  sales: Sale;

  @ManyToOne(() => Product, (product) => product.salesDetails)
  @JoinColumn({ name: 'product_id' })
  products: Product;
}
