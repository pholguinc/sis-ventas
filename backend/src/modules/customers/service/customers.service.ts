import { Body, Injectable, NotFoundException, Req } from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../../utils/error.manager';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  async create(data) {
    try {
      const newCustomer = this.customerRepo.create(data);
      return await this.customerRepo.save(newCustomer);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Customer>> {
    const cb = this.customerRepo.createQueryBuilder('c');
    cb.orderBy('c.id', 'DESC');

    return paginate<Customer>(this.customerRepo, options);
  }
  async findAll(): Promise<Customer[]> {
    try {
      const users = await this.customerRepo.find({
        order: {
          name: 'ASC',
        },
      });
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /*async findAll(page: number, limit: number): Promise<Customer[]> {
    const customers = await this.customerRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return customers;
  }*/

  async findOne(id: string): Promise<Customer> {
    try {
      const customer: Customer = await this.customerRepo
        .createQueryBuilder('customers')
        .where({ id })
        .getOne();
      if (!customer) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return customer;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(
    body: UpdateCustomerDto,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const customer: UpdateResult = await this.customerRepo.update(id, body);
      if (customer.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return customer;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult | undefined> {
    try {
      const customer: DeleteResult = await this.customerRepo.delete(id);
      if (customer.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return customer;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
