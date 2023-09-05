import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAt } from '../../../database/date-at.entity';
import { Sale } from '../../sales/entities/sale.entity';
@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname_pater: string;

  @Column({ type: 'varchar', length: 255 })
  lastname_mater: string;

  @Column({ type: 'varchar', length: 255 })
  numDoc: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 9 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
