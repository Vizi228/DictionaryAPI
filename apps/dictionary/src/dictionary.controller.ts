import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { JwtAuthGuard } from '@app/common';
import { CurrentUser } from '../../auth/src/current-user.decorator';
import { User } from '../../auth/src/users/schemas/user.schema';
import { InsertWordsRequest, UpdateWordRequest } from './dto/word.request';
import { TranslateRequest } from './dto/translate.request';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getWords(@CurrentUser() user: User) {
    return this.dictionaryService.getWords(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async insertWords(
    @Body() request: InsertWordsRequest,
    @CurrentUser() user: User,
  ) {
    return this.dictionaryService.insertWords(request.words, user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateWord(@Body() request: UpdateWordRequest) {
    return this.dictionaryService.updateWord(request);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteWords(@Body() ids: string[]) {
    return this.dictionaryService.deleteWords(ids);
  }

  @Post('translate')
  @UseGuards(JwtAuthGuard)
  async translateWord(@Body() request: TranslateRequest, @Req() req: any) {
    return this.dictionaryService.translateWord(
      request.word,
      request.sourceLanguage,
      request.targetLanguage,
      req.cookies?.Authentication,
    );
  }
}
