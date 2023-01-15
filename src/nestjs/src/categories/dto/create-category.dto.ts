import { CreateCategoryDto as ICreateCategoryDto } from '@core/microvideos/dist/category/application';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto implements ICreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
