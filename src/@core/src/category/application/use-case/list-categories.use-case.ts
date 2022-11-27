import { BaseUseCase } from "../../../@shared/application";
import { Category, CategoryRepository } from "../../domain";
import { CategoryTransformer } from "../transformer";
import { PaginateTransformer } from "../../../@shared/application/transformer/paginate.transformer";
import { PaginateInput, PaginateOutput } from "../../../@shared/domain";
import { ListCategoryOutputDto as Output, ListCategoryDto as Input } from "../dto";

export class ListCategoriesUseCase implements BaseUseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const paginateInput = new PaginateInput(input);

    const paginate = await this.categoryRepo.paginate(paginateInput);

    return this.toOutput(paginate);
  }

  private toOutput(paginate: PaginateOutput<Category>): Output {
    const collection = paginate.collection.map(category => CategoryTransformer.toOutput(category));

    return PaginateTransformer.toOutput(collection, paginate);
  }
}