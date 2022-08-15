import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductEntity {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  categoryId: string;
}

export type ProductDocument = ProductEntity & Document;

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
