import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomersService } from './service/customers.service';
import { Customer } from './entities/customer.entity';

const mockCustomerRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const customerData = {
        name: 'John',
        lastname_pater: 'Doe',
        lastname_mater: 'Smith',
        numDoc: '123456789',
        email: 'john@example.com',
        phone: '555-5555',
        address: '123 Main St',
        register: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      const mockCustomer = { id: 'someId', ...customerData };
      mockCustomerRepository.create.mockReturnValue(mockCustomer);
      mockCustomerRepository.save.mockReturnValue(mockCustomer);

      const result = await service.create(customerData);

      expect(result).toEqual(mockCustomer);
      expect(mockCustomerRepository.create).toHaveBeenCalledWith(customerData);
      expect(mockCustomerRepository.save).toHaveBeenCalledWith(mockCustomer);
    });
  });
});
