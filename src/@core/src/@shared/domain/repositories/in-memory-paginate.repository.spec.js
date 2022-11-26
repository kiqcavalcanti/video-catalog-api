"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entities/entity");
const in_memory_paginate_repository_1 = require("./in-memory-paginate.repository");
const paginate_input_vo_1 = require("../value-objects/paginate-input.vo");
class EntityStub extends entity_1.Entity {
    constructor(props, uuid) {
        var _a;
        super(props, uuid);
        this.props.createdAt = (_a = this.props.createdAt) !== null && _a !== void 0 ? _a : new Date();
    }
}
class InMemoryPaginateRepositoryStub extends in_memory_paginate_repository_1.InMemoryPaginateRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ['name'];
    }
    async applyFilters(collection, filter) {
        if (!filter) {
            return collection;
        }
        return collection.filter((item) => item.props.name.toLowerCase() === filter.toLowerCase());
    }
}
class InMemoryPaginateRepositoryStub2 extends in_memory_paginate_repository_1.InMemoryPaginateRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ['name', 'createdAt'];
    }
    async applyFilters(collection, filter) {
        if (!filter) {
            return collection;
        }
        return collection.filter((item) => item.props.name.toLowerCase() === filter.toLowerCase());
    }
}
describe('In Memory Paginate Repository Unit Tests', () => {
    const repository = new InMemoryPaginateRepositoryStub();
    const entities = [
        new EntityStub({ name: 'd', age: 1, createdAt: new Date('1994-08-14') }),
        new EntityStub({ name: 'a', age: 1, createdAt: new Date('1994-11-01') }),
        new EntityStub({ name: 'e', age: 1, createdAt: new Date('1991-08-14') }),
        new EntityStub({ name: 'b', age: 1, createdAt: new Date('1990-08-14') }),
        new EntityStub({ name: 'c', age: 1, createdAt: new Date('2000-08-14') }),
        new EntityStub({ name: 'b', age: 12, createdAt: new Date('1993-08-14') }),
        new EntityStub({ name: 'b', age: 13 }),
    ];
    repository.collection = entities;
    it('should paginate with default values', async () => {
        const paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({}));
        expect(paginate.currentPage).toBe(1);
        expect(paginate.perPage).toBe(15);
        expect(paginate.filter).toBe(null);
        expect(paginate.orderBy).toBe(null);
        expect(paginate.collection).toStrictEqual(entities);
        expect(paginate.lastPage).toBe(1);
        expect(paginate.total).toBe(entities.length);
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 15,
            filter: null,
            orderBy: null,
            collection: entities,
            lastPage: 1,
            total: entities.length,
        });
    });
    it('should paginate and apply filters', async () => {
        let paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 1,
            perPage: 2,
            filter: 'b',
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 2,
            filter: 'b',
            orderBy: null,
            collection: [entities[3], entities[5]],
            lastPage: 2,
            total: 3,
        });
        paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 2,
            perPage: 2,
            filter: 'b',
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 2,
            perPage: 2,
            filter: 'b',
            orderBy: null,
            collection: [entities[6]],
            lastPage: 2,
            total: 3,
        });
    });
    it('should paginate and sort', async () => {
        let paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 1,
            perPage: 4,
            orderBy: { field: 'name', direction: 'asc' },
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 4,
            filter: null,
            orderBy: { field: 'name', direction: 'asc' },
            collection: [entities[1], entities[3], entities[5], entities[6]],
            lastPage: 2,
            total: 7,
        });
        paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 2,
            perPage: 4,
            orderBy: { field: 'name', direction: 'asc' },
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 2,
            perPage: 4,
            filter: null,
            orderBy: { field: 'name', direction: 'asc' },
            collection: [entities[4], entities[0], entities[2]],
            lastPage: 2,
            total: 7,
        });
        paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 1,
            perPage: 2,
            orderBy: { field: 'name', direction: 'desc' },
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 2,
            filter: null,
            orderBy: { field: 'name', direction: 'desc' },
            collection: [entities[2], entities[0]],
            lastPage: 4,
            total: 7,
        });
        paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 2,
            perPage: 2,
            orderBy: { field: 'name', direction: 'desc' },
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 2,
            perPage: 2,
            filter: null,
            orderBy: { field: 'name', direction: 'desc' },
            collection: [entities[4], entities[3]],
            lastPage: 4,
            total: 7,
        });
    });
    it('should paginate and apply default sort', async () => {
        const repository = new InMemoryPaginateRepositoryStub2();
        repository.collection = entities;
        const paginate = await repository.paginate(new paginate_input_vo_1.PaginateInput({
            page: 1,
            perPage: 3,
        }));
        expect(paginate.toJSON()).toStrictEqual({
            currentPage: 1,
            perPage: 3,
            filter: null,
            orderBy: null,
            collection: [entities[6], entities[4], entities[1]],
            lastPage: 3,
            total: 7,
        });
    });
});
