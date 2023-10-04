import { AuthGuard } from '@nestjs/passport';
import { UpdateCustomerDto } from '../../customers/dto/create-customer.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from '../services/settings.service';
import { CreateSettingDto, UpdateSettingDto } from '../dto/setting.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//@UseGuards(AuthGuard('jwt'))
@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Petición HTTP para listar clientes' })
  async findAll() {
    return this.settingsService.findAll();
  }

  @Post()
  async create() {
    return this.settingsService.create();
  }

  @Put()
  @ApiOperation({
    summary: 'Petición HTTP para actualizar la configuración del sistema',
  })
  async updateAll(@Body() body: UpdateSettingDto) {
    return this.settingsService.updateAll(body);
  }
}
