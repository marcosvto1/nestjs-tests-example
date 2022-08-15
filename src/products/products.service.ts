import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResDto } from './dto/res/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    this.validateNameProduct(createProductDto.name);
    await this.validateCategory(createProductDto.categoryId);
    const product = await this.productRepo.save(createProductDto);
    return new CreateProductResDto(product);
  }

  private async validateCategory(categoryId: string) {
    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new BadRequestException('category not found');
    }
    return true;
  }

  private validateNameProduct(productName: string) {
    if (!productName) {
      throw new BadRequestException('name is empty');
    }

    if (productName.length <= 5) {
      throw new BadRequestException('name invalid');
    }
  }
}
