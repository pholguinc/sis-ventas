import { User } from '../../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateSaleDto, UpdateSaleDto } from '../dto/sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { ErrorManager } from '../../../utils/error.manager';
@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  private sales = [];
  async create(data: CreateSaleDto) {
    try {
      const newSale = new Sale();
      newSale.total = data.total;
      newSale.items = data.items;
      newSale.cash = data.cash;
      newSale.change = data.change;
      newSale.status = data.status;

      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      newSale.user = user;

      return this.saleRepo.save(newSale);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
