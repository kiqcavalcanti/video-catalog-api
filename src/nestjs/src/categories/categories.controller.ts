import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Inject,
  Query,
  HttpCode,
} from '@nestjs/common';

import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  DeleteCategoryUseCase,
  UpdateCategoryUseCase,
} from '@core/microvideos/category/application';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ListCategoryDto } from './dto/list-category.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private readonly createUseCase: CreateCategoryUseCase;

  @Inject(GetCategoryUseCase)
  private readonly getUseCase: GetCategoryUseCase;

  @Inject(ListCategoriesUseCase)
  private readonly listUseCase: ListCategoriesUseCase;

  @Inject(DeleteCategoryUseCase)
  private readonly deleteUseCase: DeleteCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private readonly updateUseCase: UpdateCategoryUseCase;

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  list(@Query() dto: ListCategoryDto) {
    return this.listUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({ id: id });
  }

  @Patch(':id')
  update(@Body() dto: UpdateCategoryDto, @Param('id') id: string) {
    return this.updateUseCase.execute({ id: id, ...dto });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id: id });
  }
}
