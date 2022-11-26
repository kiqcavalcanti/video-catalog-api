"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInMemoryRepository = void 0;
const in_memory_paginate_repository_1 = require("../../../@shared/domain/repositories/in-memory-paginate.repository");
class CategoryInMemoryRepository extends in_memory_paginate_repository_1.InMemoryPaginateRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ['name', 'createdAt'];
    }
    async applyFilters(collection, filter) {
        if (!filter) {
            return collection;
        }
        return collection.filter((item) => item.name.toLowerCase() === filter.toLowerCase());
    }
}
exports.CategoryInMemoryRepository = CategoryInMemoryRepository;
