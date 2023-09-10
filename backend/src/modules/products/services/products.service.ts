import { Category } from '../../categories/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Brand } from 'src/modules/brands/entities/brand.entity';
import { Repository, DeleteResult } from 'typeorm'; // Import FindOptions
import { CategoriesService } from 'src/modules/categories/services/categories.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private categoriesService: CategoriesService,
  ) {}

  private products = [];

  async create(data: CreateProductDto) {
    try {
      const newProduct = new Product();
      newProduct.name = data.name;
      newProduct.description = data.description;
      newProduct.price = data.price;
      newProduct.stock = data.stock;

      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      const category = await this.categoryRepo.findOne({
        where: { id: data.categoryId },
      });

      if (!brand || !category) {
        throw new Error('Brand or category not found.');
      }

      newProduct.brand = brand;
      newProduct.category = category;

      return this.productRepo.save(newProduct);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepo.find({
        relations: ['category', 'brand'],
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

      if (updateProductDto.categoryId) {
        const category = await this.categoryRepo.findOne({
          where: { id: updateProductDto.categoryId },
        });
        if (!category) {
          throw new Error('Category not found.');
        }
        //productToUpdate.category = category;
      }

      // Update the properties of the product
      productToUpdate.name = updateProductDto.name || productToUpdate.name;
      productToUpdate.description =
        updateProductDto.description || productToUpdate.description;
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
