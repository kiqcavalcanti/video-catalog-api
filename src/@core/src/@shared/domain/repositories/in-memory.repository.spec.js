"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_repository_1 = require("./in-memory.repository");
const entity_1 = require("../entities/entity");
const uuid_vo_1 = require("../value-objects/uuid.vo");
const uuid_1 = require("uuid");
const entity_not_found_error_1 = __importDefault(require("../exceptions/entity-not-found.error"));
class EntityStub extends entity_1.Entity {
}
class InMemoryRepositoryStub extends in_memory_repository_1.InMemoryRepository {
}
describe('In Memory Repository Unit Tests', () => {
    let inMemoryRepositoryStub;
    beforeEach(() => (inMemoryRepositoryStub = new InMemoryRepositoryStub()));
    it('should insert', async () => {
        const entity = new EntityStub({ name: 'Kaique', age: 28 });
        await inMemoryRepositoryStub.insert(entity);
        expect(inMemoryRepositoryStub.collection[0]).toStrictEqual(entity);
    });
    it('should update', async () => {
        const entity = new EntityStub({ name: 'Kaique', age: 28 });
        await inMemoryRepositoryStub.insert(entity);
        const updatedEntity = new EntityStub({ name: 'Kaique 2', age: 30 }, entity.uuid);
        await inMemoryRepositoryStub.update(updatedEntity);
        expect(inMemoryRepositoryStub.collection[0]).toStrictEqual(updatedEntity);
    });
    it('should throw error if not find the entity by id when update', async () => {
        const uuid = (0, uuid_1.v4)();
        const uuidVo = new uuid_vo_1.UuidValueObject(uuid);
        const entity = new EntityStub({ name: 'Kaique', age: 28 }, uuidVo);
        await expect(() => inMemoryRepositoryStub.update(entity)).rejects.toThrow('Entity not found using id ' + uuid);
        await expect(() => inMemoryRepositoryStub.update(entity)).rejects.toThrow(new entity_not_found_error_1.default('Entity not found using id ' + uuid));
    });
    it('should find the entity by id', async () => {
        const uuid = (0, uuid_1.v4)();
        const uuidVo = new uuid_vo_1.UuidValueObject((0, uuid_1.v4)());
        const collection = [
            new EntityStub({ name: 'Kaique', age: 28 }, new uuid_vo_1.UuidValueObject(uuid)),
            new EntityStub({ name: 'Kaique 2', age: 30 }, uuidVo),
        ];
        for (const entity of collection) {
            await inMemoryRepositoryStub.insert(entity);
        }
        expect(await inMemoryRepositoryStub.findById(uuid)).toStrictEqual(collection[0]);
        expect(await inMemoryRepositoryStub.findById(uuidVo)).toStrictEqual(collection[1]);
    });
    it('should throw error if not find the entity by id', async () => {
        const uuid = (0, uuid_1.v4)();
        await expect(() => inMemoryRepositoryStub.findById(uuid)).rejects.toThrow(new entity_not_found_error_1.default('Entity not found using id ' + uuid));
    });
    it('should find all', async () => {
        const collection = [
            new EntityStub({ name: 'Kaique', age: 28 }),
            new EntityStub({ name: 'Kaique 2', age: 30 }),
        ];
        for (const entity of collection) {
            await inMemoryRepositoryStub.insert(entity);
        }
        const entities = await inMemoryRepositoryStub.findAll();
        expect(entities).toStrictEqual(collection);
    });
    it('should delete', async () => {
        const uuid = (0, uuid_1.v4)();
        const uuidVo = new uuid_vo_1.UuidValueObject((0, uuid_1.v4)());
        const collection = [
            new EntityStub({ name: 'Kaique', age: 28 }, new uuid_vo_1.UuidValueObject(uuid)),
            new EntityStub({ name: 'Kaique 2', age: 30 }, uuidVo),
        ];
        for (const entity of collection) {
            await inMemoryRepositoryStub.insert(entity);
        }
        await inMemoryRepositoryStub.delete(uuid);
        expect(inMemoryRepositoryStub.collection[0]).toStrictEqual(collection[1]);
        await inMemoryRepositoryStub.delete(uuidVo);
        expect(inMemoryRepositoryStub.collection).toHaveLength(0);
    });
    it('should throw error if not find the entity by id when delete', async () => {
        const uuid = (0, uuid_1.v4)();
        await expect(() => inMemoryRepositoryStub.delete(uuid)).rejects.toThrow(new entity_not_found_error_1.default('Entity not found using id ' + uuid));
    });
});
