import { Module } from '@nestjs/common';
import { SalesDetailsService } from './services/sales-details.service';
import { SalesDetailsController } from './controllers/sales-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesDetails } from './entities/sales-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesDetails])],
  controllers: [SalesDetailsController],
  providers: [SalesDetailsService],
})
export class SalesDetailsModule {}
