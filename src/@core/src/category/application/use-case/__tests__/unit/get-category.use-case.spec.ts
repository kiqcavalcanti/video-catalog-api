import { GetCategoryUseCase } from "../../get-category.use-case";
import { CategoryInMemoryRepository } from "../../../../infra";
import EntityNotFoundError from "../../../../../@shared/domain/exceptions/entity-not-found.error";
import { Category } from "../../../../domain";

describe("GetCategoryUseCase Unit Tests", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new EntityNotFoundError(`Entity not found using id fake id`)
    );
  });

  it("should returns a category", async () => {
    const items = [new Category({ name: "Movie" })];
    repository.collection = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: "Movie",
      description: null,
      isActive: true,
      createdAt: items[0].createdAt,
    });
  });
});
