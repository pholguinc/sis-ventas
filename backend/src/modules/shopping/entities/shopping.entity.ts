import { Setting } from '../../settings/entities/setting.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingDetails } from './shoppingDetails.entity';
import { DateAt } from '../../../database/date-at.entity';

@Entity({ name: 'shopping' })
export class Shopping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  voucher: string;

  @Column('decimal', { precision: 5, scale: 2 })
  total: number;

  @Column('decimal', { precision: 5, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 5, scale: 2 })
  cash: number;

  @Column('decimal', { precision: 5, scale: 2 })
  change: number;

  @OneToMany(
    () => ShoppingDetails,
    (shoppingDetails) => shoppingDetails.shopping,
  )
  shoppingDetails: ShoppingDetails[];

  @Column(() => DateAt, { prefix: false })
  register: DateAt;

  /*@OneToMany(() => Shopping, (shopping) => shopping.shoppingDetails)
  shoppingDetails: ShoppingDetails[];*/

  /*@ManyToOne(() => Setting, (setting) => setting.shoppings)
  setting: Setting;*/
}
