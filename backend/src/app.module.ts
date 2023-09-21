import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './modules/customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SalesModule } from './modules/sales/sales.module';
import { SalesDetailsModule } from './modules/sales-details/sales-details.module';
import { SkuModule } from './modules/sku/sku.module';
import configSchema from './config/configSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    DatabaseModule,
    CustomersModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    ProvidersModule,
    SettingsModule,
    SalesModule,
    SalesDetailsModule,
    SkuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
