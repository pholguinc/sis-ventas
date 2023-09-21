import { Module } from '@nestjs/common';
import { SkuService } from './services/sku.service';
import { SkuController } from './controllers/sku.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sku } from './entities/sku.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sku])],
  controllers: [SkuController],
  providers: [SkuService],
})
export class SkuModule {}
