import { ErrorManager } from '../../../utils/error.manager';
import { Injectable } from '@nestjs/common';
import { CreateProviderDto, UpdateProviderDto } from '../dto/provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Provider } from '../entities/provider.entity';
@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider) private providerRepo: Repository<Provider>,
  ) {}
  async create(data: CreateProviderDto) {
    try {
      const newProvider = this.providerRepo.create(data);
      return await this.providerRepo.save(newProvider);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<Provider[]> {
    try {
      const providers = await this.providerRepo.find({
        order: {
          name: 'ASC',
        },
      });
      if (providers.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return providers;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<Provider> {
    try {
      const provider: Provider = await this.providerRepo
        .createQueryBuilder('providers')
        .where({ id })
        .getOne();
      if (!provider) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return provider;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(
    body: UpdateProviderDto,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const provider: UpdateResult = await this.providerRepo.update(id, body);
      if (provider.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return provider;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult | undefined> {
    try {
      const provider: DeleteResult = await this.providerRepo.delete(id);
      if (provider.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return provider;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getProductsByProvider(providerId: string) {
    const provider = await this.providerRepo
      .createQueryBuilder('provider')
      .leftJoinAndSelect('provider.products', 'products')
      .where('provider.id = :id', { id: providerId })
      .getOne();

    return provider.products;
  }
}
