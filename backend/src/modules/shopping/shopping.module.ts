import { Module } from '@nestjs/common';
import { ShoppingService } from './services/shopping.service';
import { ShoppingController } from './controllers/shopping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shopping } from './entities/shopping.entity';
import { Setting } from '../settings/entities/setting.entity';
import { ShoppingDetails } from './entities/shoppingDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shopping, Setting, ShoppingDetails])],
  controllers: [ShoppingController],
  providers: [ShoppingService],
})
export class ShoppingModule {}
