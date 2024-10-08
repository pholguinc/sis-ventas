import { Category } from '../../categories/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Repository, DeleteResult, In } from 'typeorm'; // Import FindOptions
import { CategoriesService } from '../../categories/services/categories.service';
import { ErrorManager } from '../../../utils/error.manager';
import { Provider } from '../../providers/entities/provider.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Provider) private providerRepo: Repository<Provider>,
    private categoriesService: CategoriesService,
  ) {}

  async create(data: CreateProductDto) {
    try {
      const countOfExistingProducts = await this.productRepo.count();

      let dynamicCode;

      if (data.code) {
        const randomPart = Math.floor(Math.random() * 10000000000000);
        const providedCode = String(data.code);
        dynamicCode = `${providedCode}${randomPart}`;
      } else {
        dynamicCode = this.generateDynamicCode(countOfExistingProducts + 1);
      }

      const newProduct = this.productRepo.create({
        ...data,
        code: dynamicCode,
      });

      if (data.brandId) {
        const brand = await this.brandRepo.findOne({
          where: { id: data.brandId },
        });
        newProduct.brand = brand;
      }

      if (data.categoryId) {
        const category = await this.categoryRepo.findOne({
          where: { id: data.categoryId },
        });
        newProduct.category = category;
      }

      if (data.providerId) {
        const provider = await this.providerRepo.findOne({
          where: { id: data.categoryId },
        });
        newProduct.provider = provider;
      }

      return this.productRepo.save(newProduct);
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  generateDynamicCode(count: number) {
    const prefix = 'CAT';
    const formattedCount = String(count).padStart(5, '0');
    return `${prefix}-${formattedCount}`;
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepo.find({
        order: {
          name: 'ASC',
        },
        relations: ['category', 'brand', 'provider'],
        select: {
          category: {
            id: false,
            name: true,
          },
          brand: {
            id: false,
            name: true,
            code: true,
          },

          provider: {
            id: false,
            name: true,
          },
        },
      });
      if (products.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return products;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product: Product = await this.productRepo
        .createQueryBuilder('products')
        .where({ id })
        .getOne();
      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return product;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const productToUpdate = await this.productRepo.findOne({
        where: { id },
      });

      if (!productToUpdate) {
        throw new Error('Product not found.');
      }

      if (updateProductDto.brandId) {
        const brand = await this.brandRepo.findOne({
          where: { id: updateProductDto.brandId },
        });
        if (!brand) {
          throw new Error('Brand not found.');
        }
        productToUpdate.brand = brand;
      }



      productToUpdate.name = updateProductDto.name || productToUpdate.name;
      productToUpdate.price = updateProductDto.price || productToUpdate.price;
      productToUpdate.stock = updateProductDto.stock || productToUpdate.stock;

      return await this.productRepo.save(productToUpdate);
    } catch (error) {
      // Handle the error here
      throw new Error('An error occurred while updating the product.');
    }
  }

  async remove(id: string): Promise<DeleteResult | undefined> {
    try {
      const product: DeleteResult = await this.productRepo.delete(id);
      if (product.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return product;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
