import { Setting } from '../../settings/entities/setting.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shopping' })
export class Shopping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 5, scale: 2 })
  price_shop: number;

  @Column('decimal', { precision: 5, scale: 2 })
  price_sale: number;

  @Column('decimal', { precision: 5, scale: 2 })
  total: number;

  @Column('decimal', { precision: 5, scale: 2 })
  change: number;

  @Column('int')
  serie_comp: number;

  @ManyToOne(() => Setting, (setting) => setting.shoppings)
  setting: Setting;
}
