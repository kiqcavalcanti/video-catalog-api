import { CategoryInMemoryRepository } from '@core/microvideos/category/infra';
import { CategoryRepository } from '@core/microvideos/category/domain';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@core/microvideos/category/application';

export const CATEGORY_REPOSITORIES = [
  {
    provide: 'CategoryInMemoryRepository',
    useClass: CategoryInMemoryRepository,
  },
];

const CURRENT_REPOSITORY = 'CategoryInMemoryRepository';

export const CATEGORY_USE_CASES = [
  {
    provide: CreateCategoryUseCase,
    useFactory: (repository: CategoryRepository) => {
      return new CreateCategoryUseCase(repository);
    },
    inject: [CURRENT_REPOSITORY],
  },

  {
    provide: UpdateCategoryUseCase,
    useFactory: (repository: CategoryRepository) => {
      return new UpdateCategoryUseCase(repository);
    },
    inject: [CURRENT_REPOSITORY],
  },

  {
    provide: GetCategoryUseCase,
    useFactory: (repository: CategoryRepository) => {
      return new GetCategoryUseCase(repository);
    },
    inject: [CURRENT_REPOSITORY],
  },

  {
    provide: ListCategoriesUseCase,
    useFactory: (repository: CategoryRepository) => {
      return new ListCategoriesUseCase(repository);
    },
    inject: [CURRENT_REPOSITORY],
  },

  {
    provide: DeleteCategoryUseCase,
    useFactory: (repository: CategoryRepository) => {
      return new DeleteCategoryUseCase(repository);
    },
    inject: [CURRENT_REPOSITORY],
  },
];
