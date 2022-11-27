import { CategoryRepository } from '../../domain';
import { Category } from '../../domain';
import {InMemoryPaginateRepository } from '../../../@shared/domain';

export class CategoryInMemoryRepository
  extends InMemoryPaginateRepository<Category>
  implements CategoryRepository
{

  sortableFields: string[] = ['name', 'createdAt'];

  protected async applyFilters(
    collection: Category[],
    filter: string | null,
  ): Promise<Category[]> {
    
    if (!filter) {
      return collection;
    }
    return collection.filter(
      (item) => item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }
}
