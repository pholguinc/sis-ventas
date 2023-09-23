import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly sale: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly categoryId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly providerId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
