import { BadRequestException } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { CategoriesService } from '../categories/categories.service';
import { CategoryDocument } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResDto } from './dto/res/create-product.dto';
import { ProductDocument } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let sut: ProductsService;
  let repository: MockProxy<ProductRepository>;
  let categoryService: MockProxy<CategoriesService>;

  beforeAll(() => {
    repository = mock<ProductRepository>();
    categoryService = mock<CategoriesService>();
  });

  beforeEach(() => {
    sut = new ProductsService(repository, categoryService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('create', () => {
    let dtoRequest: CreateProductDto;
    let productDoc: MockProxy<ProductDocument>;

    beforeAll(() => {
      dtoRequest = new CreateProductDto();
      dtoRequest.name = 'any_name';
      dtoRequest.categoryId = 'any_category_id';

      const docCategory = mock<CategoryDocument>();
      docCategory._id = 'any_category_id';
      docCategory.name = 'any_category';

      categoryService.findOne.mockResolvedValue(docCategory);

      productDoc = mock<ProductDocument>();
      productDoc.name = 'any_name';
      productDoc._id = 'any_id';
      productDoc.categoryId = 'any_category_id';
      repository.save.mockResolvedValue(productDoc);
    });

    it('should throw exception when product is empty', () => {
      const request = { ...dtoRequest, name: '' };

      const promise = sut.create(request);

      expect(promise).rejects.toEqual(new BadRequestException('name is empty'));
    });

    it('should throw exception when product name less than 4 chars', () => {
      const request = { ...dtoRequest, name: 'AA' };

      const promise = sut.create(request);

      expect(promise).rejects.toEqual(new BadRequestException('name invalid'));
    });

    it('should call CategoryService.findOne with correct categoryId', async () => {
      await sut.create(dtoRequest);

      expect(categoryService.findOne).toHaveBeenCalledTimes(1);
      expect(categoryService.findOne).toHaveBeenCalledWith(
        dtoRequest.categoryId,
      );
    });

    it('should throw exception if CategoryService.findOne returns undefined', () => {
      categoryService.findOne.mockResolvedValueOnce(undefined);

      const promise = sut.create(dtoRequest);

      expect(promise).rejects.toEqual(
        new BadRequestException('category not found'),
      );
    });

    it('should call productRepo.save with correct params', async () => {
      await sut.create(dtoRequest);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(dtoRequest);
    });

    it('should return right result', async () => {
      const res = await sut.create(dtoRequest);

      expect(res).toBeInstanceOf(CreateProductResDto);
      expect(res).toMatchObject({
        name: productDoc.name,
        _id: productDoc._id,
      });
    });
  });
});
