import { BaseUseCase } from "../../../@shared/application";
import { GetCategoryDto as Input, CategoryOutputDto as Output} from "../dto";
import { CategoryRepository} from "../../domain";
import { CategoryTransformer } from "../transformer";

export class GetCategoryUseCase implements BaseUseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id);
    return CategoryTransformer.toOutput(entity);
  }
}
