import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/utils/error.manager';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const profile = new Profile();
      profile.names = data.names;
      profile.lastname_pater = data.lastname_pater;
      profile.lastname_mater = data.lastname_mater;
      profile.phone = data.phone;
      profile.numDoc = data.numDoc;
      profile.address = data.address;

      const newProfile = await this.profileRepo.save(profile);

      const newUser = this.userRepo.create(data);
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPassword;
      newUser.profile = newProfile;
      return this.userRepo.save(newUser);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepo.find({
        where: {
          role: 'customer',
        },
        relations: ['profile'],
      });
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.userRepo
        .createQueryBuilder('users')
        .where({ id })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(body: UpdateUserDto, id: string): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepo.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepo.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
