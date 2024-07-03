import { catchError, NEVER, throwError } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../../auth/src/users/schemas/user.schema';
import { DictionaryRepository } from './dictionary.repository';
import { Word } from './schemas/word.schema';
import { InsertWordRequest, UpdateWordRequest } from './dto/word.request';
import { TRANSLATOR_SERVICE } from './constants/services';

@Injectable()
export class DictionaryService {
  constructor(
    private readonly dictionaryRepository: DictionaryRepository,
    @Inject(TRANSLATOR_SERVICE) private translatorClient: ClientProxy,
  ) {}

  async getWords(user: User): Promise<Word[]> {
    return this.dictionaryRepository.find({
      user_id: user._id,
    });
  }

  async insertWords(words: InsertWordRequest[], user: User): Promise<void> {
    const session = await this.dictionaryRepository.startTransaction();
    try {
      for (const word of words) {
        await this.dictionaryRepository.create(
          {
            ...word,
            user_id: user._id,
          },
          {
            session,
          },
        );
      }
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async updateWord(word: UpdateWordRequest): Promise<void> {
    await this.dictionaryRepository.findOneAndUpdate(
      {
        _id: word._id,
      },
      word,
    );
  }

  async deleteWords(ids: string[]): Promise<void> {
    await this.dictionaryRepository.deleteMany({ _id: { $in: ids } });
  }

  async translateWord(
    word: string,
    sourceLanguage: string,
    targetLanguage: string,
    auth: string,
  ): Promise<string> {
    return await new Promise((resolve, reject) => {
      this.translatorClient
        .send('translate', {
          text: word,
          sourceLanguage,
          targetLanguage,
          Authentication: auth,
        })
        .pipe(
          catchError(() => {
            reject('Error during translation');
            return NEVER;
          }),
        )
        .subscribe((translatedText: string) => resolve(translatedText));
    });
  }
}
