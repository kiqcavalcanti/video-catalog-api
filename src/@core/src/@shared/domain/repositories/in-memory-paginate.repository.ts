import { InMemoryRepository } from './in-memory.repository';
import { Entity } from '../entities';
import { IPaginateRepository } from './paginate.repository.interface';
import { PaginateInput } from '../value-objects';
import { PaginateOutput } from '../value-objects';
import { OrderBy } from '../value-objects';

export abstract class InMemoryPaginateRepository<
    E extends Entity,
    Filter = string,
  >
  extends InMemoryRepository<E>
  implements IPaginateRepository<E, Filter>
{
  abstract sortableFields: string[];
  defaultSort: OrderBy = { field: 'createdAt', direction: 'desc' };

  async paginate(
    paginateInput: PaginateInput<Filter>,
  ): Promise<PaginateOutput<E, Filter>> {

    const collectionFiltered = await this.applyFilters(
      this.collection,
      paginateInput.filter,
    );
    const collectionOrdered = await this.applySort(
      collectionFiltered,
      paginateInput.orderBy,
    );
    const collection = await this.applyPaginate(
      collectionOrdered,
      paginateInput.page,
      paginateInput.perPage,
    );

    return new PaginateOutput<E, Filter>({
      perPage: paginateInput.perPage,
      orderBy: paginateInput.orderBy,
      total: collectionFiltered.length,
      collection,
      filter: paginateInput.filter,
      currentPage: paginateInput.page,
    });
  }

  protected abstract applyFilters(
    collection: E[],
    filter: Filter | null,
  ): Promise<E[]>;

  protected async applySort(items: E[], sort: OrderBy): Promise<E[]> {
    const currentSort = sort ? sort : this.defaultSort;

    if (!currentSort || !this.sortableFields.includes(currentSort.field)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[currentSort.field] < b.props[currentSort.field]) {
        return currentSort.direction === 'asc' ? -1 : 1;
      }

      if (a.props[currentSort.field] > b.props[currentSort.field]) {
        return currentSort.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: number,
    perPage: number,
  ): Promise<E[]> {
    const start = (page - 1) * perPage;
    const limit = start + perPage;
    return items.slice(start, limit);
  }
}
