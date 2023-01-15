import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import {
  CATEGORY_REPOSITORIES,
  CATEGORY_USE_CASES,
} from './category.providers';

describe('CategoriesController e2e tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [...CATEGORY_REPOSITORIES, ...CATEGORY_USE_CASES],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
