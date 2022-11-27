import { PaginationOutputDto } from "../../../@shared/application";
import { CategoryOutputDto } from "./category-output.dto";

export type ListCategoryOutputDto = PaginationOutputDto<CategoryOutputDto>
