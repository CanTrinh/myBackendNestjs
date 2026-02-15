import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { UserCreatedListener } from './listeners/user-created.listener';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, PrismaService,UserCreatedListener, AuthService],
  exports: [UsersService] // xuat lop service ra de dung trong lop xac thuc authentication
})
export class UsersModule {}
