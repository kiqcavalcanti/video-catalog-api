import { BaseUseCase } from "../../../@shared/application";
import { UpdateCategoryDto as Input, CategoryOutputDto as Output } from "../dto";
import { CategoryRepository } from "../../domain";
import { CategoryTransformer } from "../transformer";

export class UpdateCategoryUseCase implements BaseUseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id);

    entity.update(input);

    if (input.isActive === true) {
      entity.activate();
    }

    if (input.isActive === false) {
      entity.deactivate();
    }

    await this.categoryRepo.update(entity);

    return CategoryTransformer.toOutput(entity);
  }
}