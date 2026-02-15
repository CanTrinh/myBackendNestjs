import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';


@Injectable()
export class UserCreatedListener {
  @OnEvent('user.created')
  handleUserCreatedEvent(event: Prisma.UserCreateInput) {
    // handle and process "OrderCreatedEvent" event
    console.log(event);
  }
}