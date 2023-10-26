import { ShoppingDetails } from './../entities/shoppingDetails.entity';
import { Injectable } from '@nestjs/common';
import { CreateShoppingDto, UpdateShoppingDto } from '../dto/shopping.dto';
import {
  CreateShoppingDetails,
  UpdateShoppingDetails,
} from '../dto/shoppingDetails.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shopping } from '../entities/shopping.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(Shopping)
    private readonly shoppingRepo: Repository<Shopping>,
    @InjectRepository(ShoppingDetails)
    private readonly shoppingDetailsRepo: Repository<ShoppingDetails>,
  ) {}

  async create(data: CreateShoppingDto): Promise<Shopping> {
    return this.shoppingRepo.create(data);
  }

  async findAll(): Promise<Shopping[]> {
    try {
      const shopping = await this.shoppingRepo.find();
      if (shopping.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return shopping;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} shopping`;
  }

  update(id: number, updateShoppingDto: UpdateShoppingDto) {
    return `This action updates a #${id} shopping`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopping`;
  }
}
