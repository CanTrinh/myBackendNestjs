import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  getHello(): string {
    return 'My Backend app!';
  }

  
}
