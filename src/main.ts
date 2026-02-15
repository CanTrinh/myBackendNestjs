import * as dotenv from 'dotenv';
dotenv.config();
import { ValidationPipe } from '@nestjs/common'; // them pipe cho viec xac thuc các tham sô đầu vào của các controllers
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import fastifyCookie from '@fastify/cookie';
import { FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import { from } from 'rxjs';



async function bootstrap() {
  const app = await NestFactory.create(
      AppModule,
  );
  app.enableCors({
    origin: '*', // Adjust this based on your security needs
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
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

