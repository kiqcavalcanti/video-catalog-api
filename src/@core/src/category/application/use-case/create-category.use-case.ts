import { CategoryOutputDto as Output } from "../dto";
import { BaseUseCase } from "../../../@shared/application";
import { Category, CategoryRepository } from "../../domain";
import { CreateCategoryDto as Input } from "../dto";
import { CategoryTransformer } from "../transformer";

export class CreateCategoryUseCase implements BaseUseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);
    await this.categoryRepo.insert(entity);
    return CategoryTransformer.toOutput(entity);
  }
}