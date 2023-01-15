import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryOutputDto } from '@core/microvideos/category/application';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ListCategoryDto } from './dto/list-category.dto';

describe('CategoriesController unit tests', () => {
  let controller: CategoriesController;

  beforeEach(() => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const expectedOutput = {
      id: 'e202b11e-378d-4ab6-9613-298b432948f0',
      name: 'movie',
      description: null,
      isActive: true,
      createdAt: new Date('2022-11-28T01:53:23.553Z'),
    } as CategoryOutputDto;

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    controller['createUseCase'] = mockCreateUseCase;

    const dto: CreateCategoryDto = {
      name: 'movie',
    };

    const output = await controller.create(dto);

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(dto);
    expect(output).toStrictEqual(expectedOutput);
  });
  it('should update a category', async () => {
    const id = 'e202b11e-378d-4ab6-9613-298b432948f0';
    const expectedOutput = {
      id,
      name: 'movie',
      description: 'some description',
      isActive: true,
      createdAt: new Date('2022-11-28T01:53:23.553Z'),
    } as CategoryOutputDto;

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    controller['updateUseCase'] = mockUpdateUseCase;

    const dto: UpdateCategoryDto = {
      name: 'movie',
      description: 'some description',
      isActive: true,
    };

    const output = await controller.update(dto, id);

    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ ...dto, id });
    expect(output).toStrictEqual(expectedOutput);
  });
  it('should get a category', async () => {
    const expectedOutput = {
      id: 'e202b11e-378d-4ab6-9613-298b432948f0',
      name: 'movie',
      description: 'some description',
      isActive: true,
      createdAt: new Date('2022-11-28T01:53:23.553Z'),
    } as CategoryOutputDto;

    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    controller['getUseCase'] = mockGetUseCase;

    const id = 'e202b11e-378d-4ab6-9613-298b432948f0';

    const output = await controller.findOne(id);

    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(output).toStrictEqual(expectedOutput);
  });
  it('should list a category', async () => {
    const expectedOutput = {
      collection: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Movie',
          description: 'some description',
          isActive: true,
          createdAt: new Date(),
        },
      ],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };

    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    controller['listUseCase'] = mockListUseCase;

    const dto: ListCategoryDto = {
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDirection: 'desc',
      filter: 'test',
    };

    const output = await controller.list(dto);

    expect(mockListUseCase.execute).toHaveBeenCalledWith(dto);
    expect(output).toStrictEqual(expectedOutput);
  });
  it('should delete a category', async () => {
    const expectedOutput = undefined;

    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    controller['deleteUseCase'] = mockDeleteUseCase;

    const id = 'e202b11e-378d-4ab6-9613-298b432948f0';

    expect(controller.remove(id)).toBeInstanceOf(Promise);

    const output = await controller.remove(id);

    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(output).toStrictEqual(expectedOutput);
  });
});
