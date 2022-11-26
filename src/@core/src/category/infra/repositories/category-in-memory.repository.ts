import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';
import { InMemoryPaginateRepository } from '../../../@shared/domain/repositories/in-memory-paginate.repository';

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
      (item) => item.name.toLowerCase() === filter.toLowerCase(),
    );
  }
}
