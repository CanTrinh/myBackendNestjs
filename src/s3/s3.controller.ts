import { Controller, Get } from '@nestjs/common';
import { S3TestService } from './s3.test.service';

@Controller('s3')
export class S3Controller {
  constructor(private s3TestService: S3TestService) {}

  @Get('test')
  async test() {
    return await this.s3TestService.testConnection();
  }
}