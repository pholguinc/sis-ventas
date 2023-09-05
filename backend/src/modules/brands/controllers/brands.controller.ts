import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { multerConfig } from 'src/utils/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as express from 'express';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import * as path from 'path';

//@UseGuards(AuthGuard('jwt'))
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiOperation({ summary: 'Petición HTTP para crear marcas' })
  create(@UploadedFile() file, @Body() data: CreateBrandDto) {
    const image = `${file.filename}`;
    data.image = image;
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
