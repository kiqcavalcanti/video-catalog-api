import { ListCategoriesUseCase } from "../../list-categories.use-case";
import { CategoryInMemoryRepository } from "../../../../infra";
import { Category } from "../../../../domain";
import { PaginateOutput } from "../../../../../@shared/domain";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  test("toOutput method", () => {
    let result = new PaginateOutput<Category>({
      collection: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      orderBy: null,
      filter: null,
    });
    let output = useCase["toOutput"](result);

    expect(output).toStrictEqual({
      collection: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
    });

    const entity = new Category({ name: "Movie" });

    result = new PaginateOutput<Category>({
      collection: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      orderBy: null,
      filter: null,
    });

    output = useCase["toOutput"](result);
    expect(output).toStrictEqual({
      collection: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
    });
  });

  it("should returns output using empty input with categories ordered by created_at", async () => {
    const items = [
      new Category({ name: "test 1" }),
      new Category({
        name: "test 2",
        createdAt: new Date(new Date().getTime() + 100),
      }),
    ];
    repository.collection = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      collection: [...items].reverse().map((i) => i.toJSON()),
      total: 2,
      currentPage: 1,
      perPage: 15,
      lastPage: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const items = [
      new Category({ name: "a" }),
      new Category({
        name: "AAA",
      }),
      new Category({
        name: "AaA",
      }),
      new Category({
        name: "b",
      }),
      new Category({
        name: "c",
      }),
    ];
    repository.collection = items;

    let output = await useCase.execute({
      page: 1,
      perPage: 2,
      orderBy: {field: 'name', direction: 'asc'},
      filter: "a",
    });
    expect(output).toStrictEqual({
      collection: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 2,
      perPage: 2,
      orderBy: {field: 'name', direction: 'asc'},
      filter: "a",
    });
    expect(output).toStrictEqual({
      collection: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 1,
      perPage: 2,
      orderBy: {field: 'name', direction: 'desc'},
      filter: "a",
    });
    expect(output).toStrictEqual({
      collection: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });
  });
});
