import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3TestService {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client([{
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    }]);
  }

  async testConnection() {
    try {
      const result = await this.s3.send(new ListBucketsCommand({}));
      return result.Buckets?.map(b => b.Name);
    } catch (err) {
      throw new Error(`S3 connection failed: ${err}`);
    }
  }
}