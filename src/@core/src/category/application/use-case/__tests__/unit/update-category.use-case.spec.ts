import { UpdateCategoryUseCase } from "../../update-category.use-case";
import {CategoryInMemoryRepository} from "../../../../infra";
import EntityNotFoundError from "../../../../../@shared/domain/exceptions/entity-not-found.error";
import {Category} from "../../../../domain";


describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake id", name: "fake" })
    ).rejects.toThrow(new EntityNotFoundError(`Entity not found using id fake id`));
  });

  it("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Category({ name: "Movie" });

    repository.collection = [entity];

    let output = await useCase.execute({ id: entity.id, name: "test1" });

    expect(spyUpdate).toHaveBeenCalledTimes(1);

    expect(output).toStrictEqual({
      id: entity.id,
      name: "test1",
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    type Arrange = {
      input: {
        id: string;
        name?: string;
        description?: null | string;
        isActive?: boolean;
      };
      expected: {
        id: string;
        name: string;
        description: null | string;
        isActive: boolean;
        createdAt: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
          name: "test2",
          description: "some description",
        },
        expected: {
          id: entity.id,
          name: "test2",
          description: "some description",
          isActive: true,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test3",
        },
        expected: {
          id: entity.id,
          name: "test3",
          description: 'some description',
          isActive: true,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          isActive: false,
        },
        expected: {
          id: entity.id,
          name: "test3",
          description: 'some description',
          isActive: false,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test5",
          description: null
        },
        expected: {
          id: entity.id,
          name: "test5",
          description: null,
          isActive: false,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test6",
          isActive: true,
        },
        expected: {
          id: entity.id,
          name: "test6",
          description: null,
          isActive: true,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test7",
          description: "some description",
          isActive: false,
        },
        expected: {
          id: entity.id,
          name: "test7",
          description: "some description",
          isActive: false,
          createdAt: entity.createdAt,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        name: i.input.name,
        description: i.input.description,
        isActive: i.input.isActive,
      });
      expect(output).toStrictEqual({
        id: entity.id,
        name: i.expected.name,
        description: i.expected.description,
        isActive: i.expected.isActive,
        createdAt: i.expected.createdAt,
      });
    }
  });
});
