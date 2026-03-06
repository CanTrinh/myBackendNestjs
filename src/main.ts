import * as dotenv from 'dotenv';
dotenv.config();
import { ValidationPipe } from '@nestjs/common'; // them pipe cho viec xac thuc các tham sô đầu vào của các controllers
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import fastifyCookie from '@fastify/cookie';
import { FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import { from } from 'rxjs';
import { json, urlencoded } from 'express';



async function bootstrap() {
  const app = await NestFactory.create(
      AppModule,
  );
  app.enableCors({
    origin: ['https://ctlife.xyz', 'https://www.ctlife.xyz'], // Adjust this based on your security needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session(
      {
        secret: 'my secret', // dung de dang ky session id cookie 
        resave: false,
        saveUninitialized: false,
      }
    )
  )

  // Nâng giới hạn body request
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ limit: '20mb', extended: true }));

  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

