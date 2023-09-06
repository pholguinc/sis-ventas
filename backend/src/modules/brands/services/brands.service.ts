import {
  Injectable,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import path, { join } from 'path';
import { promises as fsPromises } from 'fs';
import { ErrorManager } from 'src/utils/error.manager';
import { readdir } from 'fs';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async create(data: CreateBrandDto) {
    try {
      const countOfExistingBrands = await this.brandRepo.count();

      let dynamicCode;

      if (data.code) {
        dynamicCode = `MARCA-${String(data.code).padStart(8, '0')}`;
      } else {
        dynamicCode = this.generateDynamicCode(countOfExistingBrands + 1);
      }

      const newBrand = this.brandRepo.create({
        ...data,
        code: dynamicCode,
      });

      return await this.brandRepo.save(newBrand);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  generateDynamicCode(count: number) {
    const prefix = 'BRAND';
    const formattedCount = String(count).padStart(5, '0');
    return `${prefix}-${formattedCount}`;
  }

  async findAll(): Promise<Brand[]> {
    try {
      const brand = await this.brandRepo.find();
      if (brand.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<Brand> {
    try {
      const brand: Brand = await this.brandRepo
        .createQueryBuilder('brands')
        .where({ id })
        .getOne();
      if (!brand) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: string, body: UpdateBrandDto): Promise<UpdateResult> {
    try {
      const brand: UpdateResult = await this.brandRepo.update(id, body);
      if (brand.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const brand: DeleteResult = await this.brandRepo.delete(id);
      if (brand.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async obtenerMarcaPorId(id: string): Promise<Brand> {
    const marca = await this.brandRepo.findOne({ where: { id } });

    if (!marca) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }

    return marca;
  }
}
