import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

describe('DictionaryController', () => {
  let dictionaryController: DictionaryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DictionaryController],
      providers: [DictionaryService],
    }).compile();

    dictionaryController = app.get<DictionaryController>(DictionaryController);
  });
});
