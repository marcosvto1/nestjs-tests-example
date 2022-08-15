import { CategoriesService } from './categories.service';
import { Model } from 'mongoose';
import { CategoryDocument } from './entities/category.entity';
import { mock } from 'jest-mock-extended';
import { CategoryRepository } from './category.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NewModel<T, TQueryHelpers, TMethodsAndOverrides, TVirtuals, TSchema>
  extends Model<T, TQueryHelpers, TMethodsAndOverrides, TVirtuals, TSchema> {}

describe('CategoriesService', () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const repo = mock<CategoryRepository>();
  let sut: CategoriesService;

  beforeEach(() => {
    sut = new CategoriesService(repo);
  });

  it('shoudl call', () => {
    sut.findOne('ANY_ID');

    expect(repo.findOne).toHaveBeenCalledWith({
      _id: 'ANY_ID',
    });
  });

  it('should return an entity', async () => {
    const mockDoc = mock<CategoryDocument>();
    mockDoc.name = 'any_name';
    mockDoc._id = 'any_id';
    repo.findOne.mockResolvedValueOnce(mockDoc);

    const result = await sut.findOne('any_id');

    expect(result.name).toBe('any_name');
  });
});
