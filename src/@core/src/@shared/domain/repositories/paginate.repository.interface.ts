import { Entity } from '../entities/entity';
import { PaginateInput } from '../value-objects/paginate-input.vo';
import { PaginateOutput } from '../value-objects/paginate-output.vo';
import { IRepository } from './repository.interface';
import { OrderBy } from '../value-objects/paginate.types';

export interface IPaginateRepository<E extends Entity, Filter = string>
  extends IRepository<E> {
  sortableFields: string[];
  defaultSort?: OrderBy;
  paginate(props: PaginateInput<Filter>): Promise<PaginateOutput<E, Filter>>;
}
