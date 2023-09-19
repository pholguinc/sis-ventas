import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Provider } from 'src/modules/providers/entities/provider.entity';

@Entity()
export class ProductProvider {
  @ManyToOne(() => Product, (product) => product.provider)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Provider, (provider) => provider.products)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;
}
