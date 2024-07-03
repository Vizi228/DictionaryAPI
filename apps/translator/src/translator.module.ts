import { Module } from '@nestjs/common';
import { RmqModule, AuthModule } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { TranslatorController } from './translator.controller';
import { TranslatorService } from './translator.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TRANSLATOR_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    AuthModule,
  ],
  controllers: [TranslatorController],
  providers: [TranslatorService],
})
export class TranslatorModule {}
