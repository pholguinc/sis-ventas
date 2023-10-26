import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateShoppingDetails {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly total: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;

  
  
}

export class UpdateShoppingDetails extends PartialType(CreateShoppingDetails) {}
