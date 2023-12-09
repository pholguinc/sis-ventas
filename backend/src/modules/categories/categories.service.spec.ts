import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './services/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

const mockCategoryRepository = {
  find: jest.fn(),
};

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const mockCategories = [
        {
          id: '3818b885-6bb2-49f2-aadd-448a1117678c',
          name: 'Adidas',
          code: 'MARCA-00000007',
        },
        {
          id: 'b5241cb5-5996-4c43-bc85-5a4b86eef4e4',
          name: 'Apple',
          code: 'MARCA-00000006',
        },
      ];

      mockCategoryRepository.find.mockResolvedValue(mockCategories);

      const result = await categoriesService.findAll();

      expect(result).toEqual(mockCategories);
      expect(mockCategoryRepository.find).toHaveBeenCalledWith({
        order: { name: 'ASC' },
      });
    });
  });
});
