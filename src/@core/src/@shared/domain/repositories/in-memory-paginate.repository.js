"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPaginateRepository = void 0;
const in_memory_repository_1 = require("./in-memory.repository");
const paginate_output_vo_1 = require("../value-objects/paginate-output.vo");
class InMemoryPaginateRepository extends in_memory_repository_1.InMemoryRepository {
    constructor() {
        super(...arguments);
        this.defaultSort = { field: 'createdAt', direction: 'desc' };
    }
    async paginate(paginateInput) {
        const collectionFiltered = await this.applyFilters(this.collection, paginateInput.filter);
        const collectionOrdered = await this.applySort(collectionFiltered, paginateInput.orderBy);
        const collection = await this.applyPaginate(collectionOrdered, paginateInput.page, paginateInput.perPage);
        return new paginate_output_vo_1.PaginateOutput({
            perPage: paginateInput.perPage,
            orderBy: paginateInput.orderBy,
            total: collectionFiltered.length,
            collection,
            filter: paginateInput.filter,
            currentPage: paginateInput.page,
        });
    }
    async applySort(items, sort) {
        const currentSort = sort ? sort : this.defaultSort;
        if (!currentSort || !this.sortableFields.includes(currentSort.field)) {
            return items;
        }
        return [...items].sort((a, b) => {
            if (a.props[currentSort.field] < b.props[currentSort.field]) {
                return currentSort.direction === 'asc' ? -1 : 1;
            }
            if (a.props[currentSort.field] > b.props[currentSort.field]) {
                return currentSort.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    async applyPaginate(items, page, perPage) {
        const start = (page - 1) * perPage;
        const limit = start + perPage;
        return items.slice(start, limit);
    }
}
exports.InMemoryPaginateRepository = InMemoryPaginateRepository;
