import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = CategoryEntity & Document;

@Schema()
export class CategoryEntity {
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
