import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/req/create-category.dto';
import { CategoryDocument, CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private repository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.repository.save(createCategoryDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({
      _id: id,
    });
  }
}
