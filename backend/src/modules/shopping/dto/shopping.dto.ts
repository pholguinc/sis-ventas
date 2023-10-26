import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateShoppingDetails } from './shoppingDetails.dto';
import { Type } from 'class-transformer';
import { ShoppingDetails } from '../entities/shoppingDetails.entity';

export class CreateShoppingDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly total: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly change: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly cash: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly voucher: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly subtotal: number;
}

export class UpdateShoppingDto extends PartialType(CreateShoppingDto) {}
