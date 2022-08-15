export class CreateProductResDto {
  _id: unknown;
  name: string;
  categoryId: string;

  constructor(data: Partial<CreateProductResDto>) {
    Object.assign(this, { ...data });
  }
}
