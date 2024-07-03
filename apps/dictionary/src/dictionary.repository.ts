import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Word } from './schemas/word.schema';

@Injectable()
export class DictionaryRepository extends AbstractRepository<Word> {
  protected readonly logger = new Logger(DictionaryRepository.name);

  constructor(
    @InjectModel(Word.name) wordModel: Model<Word>,
    @InjectConnection() connection: Connection,
  ) {
    super(wordModel, connection);
  }
}
