import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Word extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  user_id: Types.ObjectId;

  @Prop()
  ukrainian: string;

  @Prop()
  norwegian: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
