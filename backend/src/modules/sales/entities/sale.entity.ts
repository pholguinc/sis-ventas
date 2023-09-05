import { User } from '../../users/entities/user.entity';
import { DateAt } from '../../../database/date-at.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SalesDetails } from '../../sales-details/entities/sales-detail.entity';
import { Customer } from '../../customers/entities/customer.entity';

export enum Status {
  Paid = 'Pagado',
  Pending = 'Pendiente',
  Cancel = 'Cancelado',
}

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  total: number;

  @Column({ type: 'int' })
  items: number;

  @Column('decimal', { precision: 5, scale: 2 })
  cash: number;

  @Column('decimal', { precision: 5, scale: 2 }) 
  change: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Pending,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => SalesDetails, (salesDetails) => salesDetails.sale)
  salesDetails: SalesDetails[];

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
