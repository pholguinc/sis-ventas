import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiOperation({ summary: 'Petición HTTP para crear marcas' })
  create(@Body() data: CreateBrandDto) {
    return this.brandsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Petición HTTP para listar marcas' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Petición HTTP para listar marcas por Id' })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Petición HTTP para actualizar marcas' })
  update(@Param('id') id: string, @Body() body: UpdateBrandDto) {
    return this.brandsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Petición HTTP para eliminar marcas' })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
