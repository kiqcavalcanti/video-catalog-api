import { OrderBy } from "../../domain";

export type PaginateInputDto<Filter = string> = {
  page?: number;
  perPage?: number;
  orderBy?: OrderBy
  filter?: Filter | null;
};
