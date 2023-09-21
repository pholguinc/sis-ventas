import { Injectable } from '@nestjs/common';
import { CreateSkuDto, UpdateSkuDto } from '../dto/sku.dto';
import { Sku } from '../entities/sku.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class SkuService {
  constructor(@InjectRepository(Sku) private skuRepo: Repository<Sku>) {}

  async create(data: CreateSkuDto) {
    try {
      const newSku = this.skuRepo.create(data);
      return await this.skuRepo.save(newSku);
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  async findAll(): Promise<Sku[]> {
    try {
      const skus = await this.skuRepo.find({
        order: {
          name: 'ASC',
        },
      });
      if (skus.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return skus;
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  async findOne(id: string): Promise<Sku> {
    try {
      const sku: Sku = await this.skuRepo
        .createQueryBuilder('sku')
        .where({ id })
        .getOne();
      if (!sku) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return sku;
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  async update(id: string, body: UpdateSkuDto): Promise<UpdateResult> {
    try {
      const sku: UpdateResult = await this.skuRepo.update(id, body);
      if (sku.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return sku;
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const sku: DeleteResult = await this.skuRepo.delete(id);
      if (sku.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return sku;
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }
}
