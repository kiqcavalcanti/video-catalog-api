import { ValueObject } from './value-object';
import { OrderBy } from './paginate.types';

export interface PaginateInputProps<Filter = string> {
  page?: number | null;
  perPage?: number | null;
  filter?: Filter | null;
  orderBy?: OrderBy;
}

export class PaginateInput<Filter = string> extends ValueObject<
  PaginateInputProps<Filter>
> {
  protected _page = 1;
  protected _perPage = 15;
  protected _filter: Filter | null = null;
  protected _orderBy: OrderBy = null;

  constructor(props: PaginateInputProps<Filter> = {}) {
    super(props);

    this.page = props.page ?? 1;
    this.perPage = props.perPage ?? 15;
    this.filter = props.filter ?? null;
    this.orderBy = props.orderBy ?? null;
  }

  get page(): number {
    return this._page as number;
  }

  private set page(value: number) {
    if (value < 1 || parseInt(value as any) !== value) {
      this._page = 1;
      return;
    }

    this._page = value;
  }

  get perPage(): number {
    return this._perPage as number;
  }

  private set perPage(value: number) {
    if (value < 1 || parseInt(value as any) !== value) {
      this._perPage = 15;
      return;
    }

    this._perPage = value;
  }

  get orderBy(): OrderBy {
    return this._orderBy as OrderBy;
  }

  private set orderBy(value: OrderBy) {
    this._orderBy = value as OrderBy;
  }

  get filter(): Filter | null {
    return this._filter as Filter | null;
  }

  private set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || value === '' ? null : value;
  }
}
