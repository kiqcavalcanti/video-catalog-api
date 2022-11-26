"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_input_vo_1 = require("../../../@shared/domain/value-objects/paginate-input.vo");
const category_in_memory_repository_1 = require("./category-in-memory.repository");
const category_entity_1 = require("../../domain/entities/category.entity");
describe('Category In Memory Repository Unit Tests', () => {
    const repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
    const entities = [
        new category_entity_1.Category({ name: 'movies' }),
        new category_entity_1.Category({ name: 'series' }),
        new category_entity_1.Category({ name: 'documentaries' }),
    ];
    repository.collection = entities;
    it('should paginate and apply filter', async () => {
        let paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 1,
            perPage: 2,
            filter: 'movies',
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 2,
            filter: 'movies',
            orderBy: null,
            collection: [entities[0]],
            lastPage: 1,
            total: 1,
        });
        paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 1,
            perPage: 2,
            filter: 'documentaries',
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 2,
            filter: 'documentaries',
            orderBy: null,
            collection: [entities[2]],
            lastPage: 1,
            total: 1,
        });
        paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 1,
            perPage: 3,
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 3,
            filter: null,
            orderBy: null,
            collection: entities,
            lastPage: 1,
            total: 3,
        });
    });
});
