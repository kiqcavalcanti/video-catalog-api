import { Category } from '../entities';
import { IPaginateRepository } from '../../../@shared/domain';

export type CategoryRepository = IPaginateRepository<Category, string>;
