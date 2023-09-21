import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '../uploads'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('NG STORE API')
    .setDescription(
      'Documentación sobre la API del punto de ventas NG STORE realizado con Nestjs',
    )
    .setVersion('1.0')
    .addTag('Users', 'Endpoints relacionados con usuarios')
    .addTag('Customers', 'Endpoints relacionados con clientes')
    .addTag('Products', 'Endpoints relacionados con productos')
    .addTag('Categories', 'Endpoints relacionados con categorías')
    .addTag('Brands', 'Endpoints relacionados con marcas')
    .addTag('Providers', 'Endpoints relacionados con proveedores')
    .addTag('SKU', 'Endpoints relacionados con los SKU')
    .addTag('Auth', 'Endpoints relacionados con el login')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  //const configService = app.get(ConfigService);
  // server port
  //const port = +configService.get<number>(process.env.PORT) || 3000;
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
