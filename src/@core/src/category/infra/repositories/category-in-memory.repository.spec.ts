import { PaginateInput } from '../../../@shared/domain/value-objects/paginate-input.vo';
import { Category } from '../../domain/entities/category.entity';
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe('Category In Memory Repository Unit Tests', () => {
  const repository = new CategoryInMemoryRepository();


  const entities = [
    new Category({ name: 'movies' }),
    new Category({ name: 'series' }),
    new Category({ name: 'documentaries' }),
  ];

  repository.collection = entities;

  it('should paginate and apply filter', async () => {

    let paginate = await repository.paginate(
      new PaginateInput({
        page: 1,
        perPage: 2,
        filter: 'movies',
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 1,
      perPage: 2,
      filter: 'movies',
      orderBy: null,
      collection: [entities[0]],
      lastPage: 1,
      total: 1,
    });

    paginate = await repository.paginate(
      new PaginateInput({
        page: 1,
        perPage: 2,
        filter: 'doc',
      }),

    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 1,
      perPage: 2,
      filter: 'doc',
      orderBy: null,
      collection: [entities[2]],
      lastPage: 1,
      total: 1,
    });

    paginate = await repository.paginate(
      new PaginateInput({
        page: 1,
        perPage: 3,
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 1,
      perPage: 3,
      filter: null,
      orderBy: null,
      collection: entities,
      lastPage: 1,
      total: 3,
    });
  });
});
