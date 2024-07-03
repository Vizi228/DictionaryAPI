import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InsertWordRequest {
  @IsString()
  @IsNotEmpty()
  ukrainian: string;

  @IsString()
  @IsNotEmpty()
  norwegian: string;
}

export class UpdateWordRequest extends InsertWordRequest {
  @IsMongoId()
  _id: string;
}

export class InsertWordsRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InsertWordRequest)
  words: InsertWordRequest[];
}
