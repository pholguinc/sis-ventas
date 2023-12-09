import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/services/categories.service';
import { Provider } from '../providers/entities/provider.entity';

const mockProductRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockBrandRepository = {
  findOne: jest.fn(),
};

const mockCategoryRepository = {
  findOne: jest.fn(),
};

const mockCategoriesService = {
  findOne: jest.fn(),
};

const mockProviderRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  let brandRepository: Repository<Brand>;
  let categoryRepository: Repository<Category>;
  let categoriesService: CategoriesService;
  let providerRepository: Repository<Provider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Brand),
          useValue: mockBrandRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
        {
          provide: getRepositoryToken(Provider),
          useValue: mockProviderRepository,
        },
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    brandRepository = module.get<Repository<Brand>>(getRepositoryToken(Brand));
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
    providerRepository = module.get<Repository<Provider>>(
      getRepositoryToken(Provider),
    );
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  describe('update', () => {
    it('should update a product', async () => {
      const productId = 'someId';
      const updateProductDto = {
        name: 'Updated Product Name',
        price: 20.99,
        stock: 100,
        brandId: 'someBrandId',
      };

      const mockProduct = new Product();
      mockProduct.id = productId;
      mockProduct.name = 'Original Product Name';
      mockProduct.price = 10.99;
      mockProduct.stock = 50;

      const mockBrand = new Brand();
      mockBrand.id = 'someBrandId';

      mockProductRepository.findOne.mockResolvedValue(mockProduct);
      mockBrandRepository.findOne.mockResolvedValue(mockBrand);
      mockProductRepository.save.mockResolvedValue(mockProduct);

      const result = await service.update(productId, updateProductDto);

      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
      });

      expect(mockProductRepository.save).toHaveBeenCalledWith(mockProduct);
    });

    it('should handle errors while updating the product', async () => {
      const productId = 'someId';
      const updateProductDto = {
        name: 'Updated Product Name',
        price: 20.99,
        stock: 100,
        brandId: 'someBrandId',
      };

      const mockProduct = new Product();
      mockProduct.id = productId;
      mockProduct.name = 'Original Product Name';
      mockProduct.price = 10.99;
      mockProduct.stock = 50;

      mockProductRepository.findOne.mockResolvedValue(mockProduct);
      mockBrandRepository.findOne.mockResolvedValue(mockProduct);
      mockProductRepository.save.mockRejectedValue(
        new Error('Some database error'),
      );

      try {
        await service.update(productId, updateProductDto);
      } catch (error) {
        expect(error.message).toBe(
          'An error occurred while updating the product.',
        );
      }
    });
  });
});
