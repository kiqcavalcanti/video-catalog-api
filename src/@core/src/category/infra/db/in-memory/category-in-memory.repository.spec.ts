import { PaginateInput } from '../../../../@shared/domain/value-objects/paginate-input.vo';
import { Category } from '../../../domain/entities/category.entity';
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe('Category In Memory Repository Unit Tests', () => {
  const repository = new CategoryInMemoryRepository();

  const entities = [
    new Category({ name: 'movies', createdAt: new Date('2022-01-01')}),
    new Category({ name: 'series', createdAt: new Date('2022-01-02')}),
    new Category({ name: 'documentaries', createdAt: new Date('2022-01-03') }),
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

    expect(paginate.toJSON(true)).toStrictEqual({
      currentPage: 1,
      perPage: 3,
      filter: null,
      orderBy: null,
      collection: [entities[2], entities[1], entities[0]].map(e => e.toJSON()),
      lastPage: 1,
      total: 3,
    });
  });
});
