import { PartialType } from '@nestjs/swagger';

export class CreateSalesDetailDto {}
export class UpdateSalesDetailDto extends PartialType(CreateSalesDetailDto) {}
