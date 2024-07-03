import { Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './schemas/word.schema';
import { DictionaryRepository } from './dictionary.repository';
import { TRANSLATOR_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/dictionary/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
    RmqModule.register({
      name: TRANSLATOR_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService, DictionaryRepository],
})
export class DictionaryModule {}
