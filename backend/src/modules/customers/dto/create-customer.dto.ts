import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastname_pater: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastname_mater: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly numDoc: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly address: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
