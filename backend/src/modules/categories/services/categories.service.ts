import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Category } from '../entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../../../utils/error.manager';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    try {
      const countOfExistingBrands = await this.categoryRepo.count();

      let dynamicCode;

      if (data.code) {
        dynamicCode = `CAT-${String(data.code).padStart(8, '0')}`;
      } else {
        dynamicCode = this.generateDynamicCode(countOfExistingBrands + 1);
      }

      const newCategory = this.categoryRepo.create({
        ...data,
        code: dynamicCode,
      });

      return await this.categoryRepo.save(newCategory);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  generateDynamicCode(count: number) {
    const prefix = 'CAT';
    const formattedCount = String(count).padStart(5, '0');
    return `${prefix}-${formattedCount}`;
  }

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepo.find();
      if (categories.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return categories;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      const category: Category = await this.categoryRepo
        .createQueryBuilder('categories')
        .where({ id })
        .getOne();
      if (!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return category;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: string, body: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      const category: UpdateResult = await this.categoryRepo.update(id, body);
      if (category.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return category;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const category: DeleteResult = await this.categoryRepo.delete(id);
      if (category.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return category;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
