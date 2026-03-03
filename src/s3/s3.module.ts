import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3TestService } from './s3.test.service';
import { S3Controller } from './s3.controller';

@Module({
  imports: [ConfigModule],
  providers: [S3TestService],
  controllers: [S3Controller],
})
export class S3Module {}