import * as deepl from 'deepl-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TranslatorService {
  private translator: deepl.Translator;
  constructor(private readonly configService: ConfigService) {
    this.translator = new deepl.Translator(
      this.configService.get('DEEPL_AUTH_KEY'),
    );
  }

  async translate(
    text: string,
    sourceLanguage: deepl.SourceLanguageCode,
    targetLanguage: deepl.TargetLanguageCode,
  ): Promise<string> {
    const translated = await this.translator.translateText(
      text,
      sourceLanguage,
      targetLanguage,
    );
    return translated.text;
  }
}
