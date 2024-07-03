import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DictionaryModule } from './dictionary.module';

async function bootstrap() {
  const app = await NestFactory.create(DictionaryModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3003'],
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
