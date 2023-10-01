import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Exclude, Type } from 'class-transformer';

import { DateAt } from '../../../database/date-at.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  names: string;

  @Column({ type: 'varchar', length: 255 })
  lastname_pater: string;

  @Column({ type: 'varchar', length: 255 })
  lastname_mater: string;

  @Column({ type: 'varchar', length: 255 })
  numDoc: string;

  @Column({ type: 'varchar', length: 9 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column(() => DateAt, { prefix: false })
  register: DateAt;
}
