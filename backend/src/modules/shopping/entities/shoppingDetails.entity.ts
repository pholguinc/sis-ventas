import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shopping } from './shopping.entity';

@Entity({ name: 'shoppingDetails' })
export class ShoppingDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  total: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Product, (product) => product.shoppingDetails)
  @JoinColumn({ name: 'product_id' })
  products: Product;

  @ManyToOne(() => Shopping, (shopping) => shopping.shoppingDetails)
  shopping: Shopping;

  /*@ManyToOne(() => Shopping, (shopping) => shopping.shoppingDetails)
  @JoinColumn({ name: 'shopping_id' })
  shopping: Shopping;*/
}
