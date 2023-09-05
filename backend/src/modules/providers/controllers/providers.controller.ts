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
import { ProvidersService } from '../services/providers.service';
import { CreateProviderDto, UpdateProviderDto } from '../dto/provider.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiOperation({ summary: 'Petición HTTP para crear proveedores' })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Petición HTTP para listar proveedores' })
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Petición HTTP para listar proveedores por Id' })
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Petición HTTP para actualizar proveedores' })
  update(@Param('id') id: string, @Body() body: UpdateProviderDto) {
    return this.providersService.update(body, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Petición HTTP para eliminar proveedores' })
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
