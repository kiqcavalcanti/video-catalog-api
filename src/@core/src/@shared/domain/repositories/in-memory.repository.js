"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepository = void 0;
const entity_not_found_error_1 = __importDefault(require("../exceptions/entity-not-found.error"));
class InMemoryRepository {
    constructor() {
        this.collection = [];
    }
    async insert(entity) {
        this.collection.push(entity);
    }
    async update(entity) {
        const index = this.collection.findIndex((item) => item.id === entity.id);
        if (index === -1) {
            throw new entity_not_found_error_1.default('Entity not found using id ' + entity.id);
        }
        this.collection[index] = entity;
    }
    async findById(uuid) {
        const id = typeof uuid === 'string' ? uuid : uuid.value;
        const entity = this.collection.find((item) => item.id === id);
        if (!entity) {
            throw new entity_not_found_error_1.default('Entity not found using id ' + id);
        }
        return entity;
    }
    async findAll() {
        return this.collection;
    }
    async delete(uuid) {
        const id = typeof uuid === 'string' ? uuid : uuid.value;
        const index = this.collection.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new entity_not_found_error_1.default('Entity not found using id ' + id);
        }
        this.collection.splice(index, 1);
    }
}
exports.InMemoryRepository = InMemoryRepository;
