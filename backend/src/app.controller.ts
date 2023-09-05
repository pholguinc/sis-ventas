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
}
