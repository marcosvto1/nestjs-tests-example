import { FilterQuery, Model } from 'mongoose';

export abstract class MongoBaseRepository<T> {
  private modelResource: Model<T>;
  constructor(modelResource: Model<T>) {
    this.modelResource = modelResource;
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    const data = this.modelResource.findOne(filter);
    return data;
  }

  async find(filter?: FilterQuery<T>): Promise<T[]> {
    return await this.modelResource.find(filter);
  }

  async save(resource: Partial<T>) {
    const model = new this.modelResource(resource);
    return model.save();
  }
}
