import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly names: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastname_pater: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastname_mater: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @ApiProperty()
  readonly numDoc: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string | undefined;

  @IsString()
  @ApiProperty()
  readonly address: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
