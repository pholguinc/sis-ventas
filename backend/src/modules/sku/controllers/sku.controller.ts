import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SkuService } from '../services/sku.service';
import { CreateSkuDto, UpdateSkuDto } from '../dto/sku.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('SKU')
@Controller('sku')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post()
  @ApiOperation({ summary: 'Petición HTTP para crear SKU' })
  create(@Body() data: CreateSkuDto) {
    return this.skuService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Petición HTTP para listar SKU' })
  findAll() {
    return this.skuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Petición HTTP para listar SKU por id' })
  findOne(@Param('id') id: string) {
    return this.skuService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Petición HTTP para actualizar SKU' })
  update(@Param('id') id: string, @Body() updateSkuDto: UpdateSkuDto) {
    return this.skuService.update(id, updateSkuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Petición HTTP para eliminar SKU' })
  remove(@Param('id') id: string) {
    return this.skuService.remove(id);
  }
}
