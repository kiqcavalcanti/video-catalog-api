"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_input_vo_1 = require("./paginate-input.vo");
describe('Paginate Value Object Unit Tests', () => {
    it('should instantiate with correct default values', () => {
        const paginate = new paginate_input_vo_1.PaginateInput();
        expect(paginate.orderBy).toBe(null);
        expect(paginate.filter).toBe(null);
        expect(paginate.page).toBe(1);
        expect(paginate.perPage).toBe(15);
    });
    it('should instantiate with correct values', () => {
        const paginate = new paginate_input_vo_1.PaginateInput({
            filter: { field: 'name', operator: '=', value: 'kaique' },
            orderBy: { field: 'field', direction: 'asc' },
            page: 2,
            perPage: 50,
        });
        expect(paginate.orderBy).toStrictEqual({
            field: 'field',
            direction: 'asc',
        });
        expect(paginate.filter).toStrictEqual({
            field: 'name',
            operator: '=',
            value: 'kaique',
        });
        expect(paginate.page).toBe(2);
        expect(paginate.perPage).toBe(50);
    });
    it('should back to default values when passing wrong params values', () => {
        let paginate = new paginate_input_vo_1.PaginateInput({
            page: 2.5,
            perPage: -1,
        });
        expect(paginate.page).toBe(1);
        expect(paginate.perPage).toBe(15);
        paginate = new paginate_input_vo_1.PaginateInput({
            perPage: null,
            page: null,
        });
        expect(paginate.page).toBe(1);
        expect(paginate.perPage).toBe(15);
    });
});
