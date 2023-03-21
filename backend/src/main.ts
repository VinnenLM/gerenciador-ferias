import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

//npm i class-validator class-transformer
//npm i @nestjs/mapped-types
//npm i -D prisma
//npx prisma init
//npm i @nestjs/jwt
//npm i typeorm pg --save @nestjs/typeorm
