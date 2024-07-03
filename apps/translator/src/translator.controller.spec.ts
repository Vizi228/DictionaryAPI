import { Test, TestingModule } from '@nestjs/testing';
import { TranslatorController } from './translator.controller';
import { TranslatorService } from './translator.service';

describe('TranslatorController', () => {
  let translatorController: TranslatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TranslatorController],
      providers: [TranslatorService],
    }).compile();

    translatorController = app.get<TranslatorController>(TranslatorController);
  });
});
