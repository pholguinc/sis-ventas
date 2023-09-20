import { Module } from '@nestjs/common';
import { SalesDetailsService } from './services/sales-details.service';
import { SalesDetailsController } from './controllers/sales-details.controller';

@Module({
  controllers: [SalesDetailsController],
  providers: [SalesDetailsService]
})
export class SalesDetailsModule {}
