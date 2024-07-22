import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';
  //definimos o horário de Brasília

  app.useGlobalPipes(new ValidationPipe());
  //biblioteca para validar requisiçõe http em toda a aplicação.

  app.enableCors();
  //CrossOrigins permite requisições de servidores diferentes

  await app.listen(4000);
}
bootstrap();
