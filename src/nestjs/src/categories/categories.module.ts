import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import {
  CATEGORY_USE_CASES,
  CATEGORY_REPOSITORIES,
} from './category.providers';

@Module({
  controllers: [CategoriesController],
  providers: [...CATEGORY_REPOSITORIES, ...CATEGORY_USE_CASES],
})
export class CategoriesModule {}
