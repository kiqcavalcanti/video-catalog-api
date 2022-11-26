"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entities/entity");
const paginate_output_vo_1 = require("./paginate-output.vo");
describe('Paginate Response Value Object Unit Tests', () => {
    class EntityStub extends entity_1.Entity {
    }
    it('should instantiate', () => {
        const collection = [
            new EntityStub({ age: 1, name: 'test1' }),
            new EntityStub({ age: 2, name: 'test2' }),
        ];
        let paginateRes = new paginate_output_vo_1.PaginateOutput({
            perPage: 2,
            currentPage: 1,
            orderBy: { field: 'test', direction: 'asc' },
            filter: 'test',
            total: 6,
            collection,
        });
        expect(paginateRes.toJSON()).toStrictEqual({
            perPage: 2,
            currentPage: 1,
            orderBy: { field: 'test', direction: 'asc' },
            filter: 'test',
            total: 6,
            lastPage: 3,
            collection,
        });
        expect(paginateRes.toJSON(true)).toStrictEqual({
            perPage: 2,
            currentPage: 1,
            orderBy: { field: 'test', direction: 'asc' },
            filter: 'test',
            total: 6,
            lastPage: 3,
            collection: collection.map((entityStub) => entityStub.toJSON()),
        });
        paginateRes = new paginate_output_vo_1.PaginateOutput({
            perPage: 2,
            currentPage: 1,
            total: 6,
            collection,
        });
        expect(paginateRes.toJSON()).toStrictEqual({
            perPage: 2,
            currentPage: 1,
            orderBy: null,
            filter: null,
            total: 6,
            lastPage: 3,
            collection,
        });
    });
});
