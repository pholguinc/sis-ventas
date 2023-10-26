import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingService } from '../services/shopping.service';
import { CreateShoppingDto, UpdateShoppingDto } from '../dto/shopping.dto';
import { ApiTags } from '@nestjs/swagger';
import { Shopping } from '../entities/shopping.entity';
import { ShoppingDetails } from '../entities/shoppingDetails.entity';
import { CreateShoppingDetails } from '../dto/shoppingDetails.dto';

@ApiTags('Shopping')
@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Post()
  async createShopping(@Body() data: CreateShoppingDto) {
    return this.shoppingService.create(data);
  }

  @Get()
  findAll() {
    return this.shoppingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingDto: UpdateShoppingDto,
  ) {
    return this.shoppingService.update(+id, updateShoppingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingService.remove(+id);
  }
}
