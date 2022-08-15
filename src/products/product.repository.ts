import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseRepository } from '../shared/abstracts/class-abstracts/mongo-base.repository';
import { ProductDocument, ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductRepository extends MongoBaseRepository<ProductDocument> {
  constructor(
    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
