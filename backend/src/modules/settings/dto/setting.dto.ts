import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { CustomLength } from 'src/utils/cutom-validators';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ruc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: number;

  @IsInt()
  @ApiProperty()
  readonly igv: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly domain: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;
}

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}
