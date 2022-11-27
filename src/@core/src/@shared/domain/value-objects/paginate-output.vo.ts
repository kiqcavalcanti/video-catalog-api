import { ValueObject } from './value-object';
import { Entity } from '../entities';
import { OrderBy } from './paginate.types';

export interface PaginateOutputProps<E extends Entity, Filter = string> {
  collection: E[];
  total: number;
  currentPage: number;
  perPage: number;
  filter?: Filter | null;
  orderBy?: OrderBy;
}

export class PaginateOutput<
  E extends Entity = Entity,
  Filter = string,
> extends ValueObject<PaginateOutputProps<E, Filter>> {
  readonly collection: E[];
  readonly total: number;
  readonly lastPage: number;
  readonly currentPage;
  readonly perPage;
  readonly filter: Filter | null;
  readonly orderBy: OrderBy;

  constructor(props: PaginateOutputProps<E, Filter>) {
    super(props);
    this.collection = props.collection;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.filter = props.filter ?? null;
    this.orderBy = props.orderBy ?? null;
    this.lastPage = Math.ceil(this.total / this.perPage);
  }

  toJSON(forceEntity = false) {
    return {
      collection: forceEntity
        ? this.collection.map((item) => item.toJSON())
        : this.collection,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: Math.ceil(this.total / this.perPage),
      orderBy: this.orderBy ?? null,
      filter: this.filter ?? null,
    };
  }
}
