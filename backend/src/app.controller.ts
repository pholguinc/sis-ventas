import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

export const Hidden = () => SetMetadata('hidden', true);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Hidden()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/connect')
  async connectToDatabase() {
    try {
      await this.connectToDatabase(); // Conecta a la base de datos
      return 'Connected to database';
    } catch (error) {
      throw new Error('Error connecting to database');
    }
  }
}
