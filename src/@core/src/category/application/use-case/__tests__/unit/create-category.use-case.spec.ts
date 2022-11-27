import { CategoryInMemoryRepository } from "../../../../infra";
import { CreateCategoryUseCase } from "../../create-category.use-case";

describe("CreateCategoryUseCase Unit Tests", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should create a category", async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({ name: "test" });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.collection[0].id,
      name: "test",
      description: null,
      isActive: true,
      createdAt: repository.collection[0].createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      isActive: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.collection[1].id,
      name: "test",
      description: 'some description',
      isActive: false,
      createdAt: repository.collection[1].createdAt,
    });
  });
});
