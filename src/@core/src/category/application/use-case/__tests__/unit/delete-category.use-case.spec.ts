import { DeleteCategoryUseCase } from "../../delete-category.use-case";
import { CategoryInMemoryRepository } from "../../../../infra";
import EntityNotFoundError from "../../../../../@shared/domain/exceptions/entity-not-found.error";
import { Category } from "../../../../domain";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake id"})
    ).rejects.toThrow(new EntityNotFoundError(`Entity not found using id fake id`));
  });

  it("should delete a category", async () => {
    const items = [new Category({ name: "test 1" })];
    repository.collection = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.collection).toHaveLength(0);
  });
});
