import { Entity } from '../entities/entity';
import { InMemoryPaginateRepository } from './in-memory-paginate.repository';
import { PaginateInput } from '../value-objects/paginate-input.vo';
import { UuidValueObject } from '../value-objects/uuid.vo';

interface EntityStubProps {
  name: string;
  age: number;
  createdAt?: Date;
}

class EntityStub extends Entity<EntityStubProps> {
  constructor(props: EntityStubProps, uuid?: UuidValueObject | null) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
}

class InMemoryPaginateRepositoryStub extends InMemoryPaginateRepository<EntityStub> {
  public sortableFields = ['name'];

  protected async applyFilters(
    collection: EntityStub[],
    filter: string | null,
  ): Promise<EntityStub[]> {
    if (!filter) {
      return collection;
    }
    return collection.filter(
      (item) => item.props.name.toLowerCase() === filter.toLowerCase(),
    );
  }
}

class InMemoryPaginateRepositoryStub2 extends InMemoryPaginateRepository<EntityStub> {
  public sortableFields = ['name', 'createdAt'];

  protected async applyFilters(
    collection: EntityStub[],
    filter: string | null,
  ): Promise<EntityStub[]> {
    if (!filter) {
      return collection;
    }
    return collection.filter(
      (item) => item.props.name.toLowerCase() === filter.toLowerCase(),
    );
  }
}

describe('In Memory Paginate Repository Unit Tests', () => {
  const repository = new InMemoryPaginateRepositoryStub();

  const entities = [
    new EntityStub({ name: 'd', age: 1, createdAt: new Date('1994-08-14') }),
    new EntityStub({ name: 'a', age: 1, createdAt: new Date('1994-11-01') }),
    new EntityStub({ name: 'e', age: 1, createdAt: new Date('1991-08-14') }),
    new EntityStub({ name: 'b', age: 1, createdAt: new Date('1990-08-14') }),
    new EntityStub({ name: 'c', age: 1, createdAt: new Date('2000-08-14') }),
    new EntityStub({ name: 'b', age: 12, createdAt: new Date('1993-08-14') }),
    new EntityStub({ name: 'b', age: 13 }),
  ];

  repository.collection = entities;

  it('should paginate with default values', async () => {
    const paginate = await repository.paginate(new PaginateInput({}));

    expect(paginate.currentPage).toBe(1);
    expect(paginate.perPage).toBe(15);
    expect(paginate.filter).toBe(null);
    expect(paginate.orderBy).toBe(null);
    expect(paginate.collection).toStrictEqual(entities);
    expect(paginate.lastPage).toBe(1);
    expect(paginate.total).toBe(entities.length);

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 1,
      perPage: 15,
      filter: null,
      orderBy: null,
      collection: entities,
      lastPage: 1,
      total: entities.length,
    });
  });
  it('should paginate and apply filters', async () => {
    let paginate = await repository.paginate(
      new PaginateInput({
        page: 1,
        perPage: 2,
        filter: 'b',
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 1,
      perPage: 2,
      filter: 'b',
      orderBy: null,
      collection: [entities[3], entities[5]],
      lastPage: 2,
      total: 3,
    });

    paginate = await repository.paginate(
      new PaginateInput({
        page: 2,
        perPage: 2,
        filter: 'b',
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 2,
      perPage: 2,
      filter: 'b',
      orderBy: null,
      collection: [entities[6]],
      lastPage: 2,
      total: 3,
    });
  });
  it('should paginate and sort', async () => {
    let paginate = await repository.paginate(
      new PaginateInput({
        page: 1,
        perPage: 4,
        orderBy: { field: 'name', direction: 'asc' },
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 1,
      perPage: 4,
      filter: null,
      orderBy: { field: 'name', direction: 'asc' },
      collection: [entities[1], entities[3], entities[5], entities[6]],
      lastPage: 2,
      total: 7,
    });

    paginate = await repository.paginate(
      new PaginateInput({
        page: 2,
        perPage: 4,
        orderBy: { field: 'name', direction: 'asc' },
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 2,
      perPage: 4,
      filter: null,
      orderBy: { field: 'name', direction: 'asc' },
      collection: [entities[4], entities[0], entities[2]],
      lastPage: 2,
      total: 7,
    });

    paginate = await repository.paginate(
      new PaginateInput({
        page: 1,
        perPage: 2,
        orderBy: { field: 'name', direction: 'desc' },
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 1,
      perPage: 2,
      filter: null,
      orderBy: { field: 'name', direction: 'desc' },
      collection: [entities[2], entities[0]],
      lastPage: 4,
      total: 7,
    });

    paginate = await repository.paginate(
      new PaginateInput({
        page: 2,
        perPage: 2,
        orderBy: { field: 'name', direction: 'desc' },
      }),
    );

    expect(paginate.toJSON()).toStrictEqual({
      currentPage: 2,
      perPage: 2,
      filter: null,
      orderBy: { field: 'name', direction: 'desc' },
      collection: [entities[4], entities[3]],
      lastPage: 4,
      total: 7,
    });
  });
  it('should paginate and apply default sort', async () => {
    const repository = new InMemoryPaginateRepositoryStub2();
    repository.collection = entities;

    const paginate = await repository.paginate(
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
      collection: [entities[6], entities[4], entities[1]],
      lastPage: 3,
      total: 7,
    });
  });
});
