import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseRepository } from '../shared/abstracts/class-abstracts/mongo-base.repository';
import { CategoryDocument, CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryRepository extends MongoBaseRepository<CategoryDocument> {
  constructor(
    @InjectModel(CategoryEntity.name)
    public categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}
