import { BaseUseCase } from "../../../@shared/application";
import { CategoryRepository } from "../../domain";
import { DeleteCategoryDto as Input, DeleteCategoryOutputDto as Output} from "../dto";

export class DeleteCategoryUseCase implements BaseUseCase<Input, void> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    await this.categoryRepository.delete(input.id);
  }
}