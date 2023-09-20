import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Exclude, Type } from 'class-transformer';

import { DateAt } from '../../../database/date-at.entity';
import { Sale } from '../../sales/entities/sales.entity';
import { ROLES } from '../../../constants/roles';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  names: string;

  @Column({ type: 'varchar', length: 255 })
  lastname_pater: string;

  @Column({ type: 'varchar', length: 255 })
  lastname_mater: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  numDoc: string;

  @Column({ type: 'varchar', length: 9 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
