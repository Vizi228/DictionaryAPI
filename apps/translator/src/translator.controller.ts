import * as deepl from 'deepl-node';
import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RmqService } from '@app/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TranslatorService } from './translator.service';

@Controller()
export class TranslatorController {
  constructor(private readonly translator: TranslatorService) {}

  @MessagePattern('translate')
  @UseGuards(JwtAuthGuard)
  async handleTranslate(
    @Payload()
    data: {
      text: string;
      sourceLanguage: deepl.SourceLanguageCode;
      targetLanguage: deepl.TargetLanguageCode;
    },
  ) {
    return this.translator.translate(
      data.text,
      data.sourceLanguage,
      data.targetLanguage,
    );
  }
}
