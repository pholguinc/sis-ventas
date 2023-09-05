import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Status } from '../entities/sale.entity';

export class CreateSaleDto {
  @IsNumber()
  @IsNotEmpty()
  readonly total: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly items: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly cash: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly change: number;

  @IsEnum(Status)
  @ApiProperty({ enum: Status })
  status: Status;

  @IsString()
  @ApiProperty()
  readonly userId: string;
}

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
