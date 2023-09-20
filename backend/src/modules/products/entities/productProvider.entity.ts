import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Product } from './product.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { DateAt } from '../../../database/date-at.entity';

export class ProductProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.providers)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Provider, (provider) => provider.products)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
