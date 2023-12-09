import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../src/modules/users/entities/user.entity';
import { UsersService } from '../../src/modules/users/services/users.service';
import { AuthService } from './services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('validateUser', () => {
    it('should return a user if credentials are valid', async () => {
      const user: User = {
        id: '2ccb4a66-29ba-4c6a-87c9-d17954d6029d',
        email: 'user2@email.com',
        password: '123456789',
        role: 'customer',
      };
      const email = 'user2@email.com';
      const password = '123456789';

      usersService.findByEmail = jest.fn().mockResolvedValue(user);

      await authService.validateUser(email, password);
    });

    it('should return null if user is not found', async () => {
      const email = 'user5@email.com';
      const password = '123456789';

      usersService.findByEmail = jest.fn().mockResolvedValue(null);

      const result = await authService.validateUser(email, password);
      expect(result).toBeNull();
    });
  });
});
