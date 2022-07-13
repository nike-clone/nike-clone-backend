import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NIKE CLONE BACKEND SERVER';
  }
}
