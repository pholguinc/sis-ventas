import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  startListening(mockPort: number) {
    throw new Error('Method not implemented.');
  }
  app: any;
  getHello(): string {
    return 'Hello World!';
  }
}
