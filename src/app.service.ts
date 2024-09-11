import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  startWheel(): string {
    return 'Start!';
  }
}
