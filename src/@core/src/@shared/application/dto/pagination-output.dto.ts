export type PaginationOutputDto<Item> = {
  collection: Item[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
