import { Product } from '../../products/entities/product.entity';
import { Sale } from '../../sales/entities/sale.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sales_details' })
export class SalesDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Sale, (sale) => sale.salesDetails)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.salesDetails)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
