import { ListCategoryDto as IListCategoryDto } from '@core/microvideos/dist/category/application';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { OrderDirection } from '@core/microvideos/@shared/domain';

export class ListCategoryDto implements IListCategoryDto {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  perPage?: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  sortDirection?: OrderDirection;

  @IsString()
  @IsOptional()
  filter?: string;
}
