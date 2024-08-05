import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Paulo Dante","https://github.com/dantekhann/ProjetoBlogPessoal","paulo.dante.neto@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';
  //definimos o horário de Brasília

  app.useGlobalPipes(new ValidationPipe());
  //biblioteca para validar requisiçõe http em toda a aplicação.

  app.enableCors();
  //CrossOrigins permite requisições de servidores diferentes

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
