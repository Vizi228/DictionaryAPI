import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { TranslatorModule } from './translator.module';

async function bootstrap() {
  const app = await NestFactory.create(TranslatorModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('TRANSLATOR'));
  await app.startAllMicroservices();
}
bootstrap();
