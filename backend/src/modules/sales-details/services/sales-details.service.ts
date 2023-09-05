import { Injectable } from '@nestjs/common';
import {
  CreateSalesDetailDto,
  UpdateSalesDetailDto,
} from '../dto/sales-detail.dto';

@Injectable()
export class SalesDetailsService {
  create(createSalesDetailDto: CreateSalesDetailDto) {
    return 'This action adds a new salesDetail';
  }

  findAll() {
    return `This action returns all salesDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesDetail`;
  }

  update(id: number, updateSalesDetailDto: UpdateSalesDetailDto) {
    return `This action updates a #${id} salesDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesDetail`;
  }
}
