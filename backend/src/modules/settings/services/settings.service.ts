import { Setting } from '../entities/setting.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto, UpdateSettingDto } from '../dto/setting.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from '../../../config/config';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingRepo: Repository<Setting>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<Setting[]> {
    try {
      const settings = await this.settingRepo.find();
      if (settings.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return settings;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getSetting(): Promise<Setting> {
    const setting = await this.settingRepo.findOne({});
    if (!setting) {
      throw new NotFoundException('Setting not found');
    }
    return setting;
  }
  async create(): Promise<Setting> {
    try {
      const settingsCount = await this.settingRepo.count();

      if (settingsCount === 0) {
        const defaultData = this.settingRepo.create({
          ruc: '10733172733',
          name: 'Empresa',
          igv: 18,
          phone: 1234567890,
          email: 'default@example.com',
          domain: `${process.env.DB_HOST}`,
          address: 'Las lomas San Juan de Miraflores',
        });

        return this.settingRepo.save(defaultData);
      } else {
        const existingSetting = await this.settingRepo.findOne({});
        return existingSetting;
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updateAll(body: UpdateSettingDto): Promise<UpdateResult> {
    try {
      return this.settingRepo.update({}, body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
