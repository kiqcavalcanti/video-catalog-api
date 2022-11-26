"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
const uuid_vo_1 = require("../value-objects/uuid.vo");
class EntitySpecStub extends entity_1.Entity {
}
describe('Entity Unit Test', () => {
    it('should set props and id', () => {
        let entityStub = new EntitySpecStub({
            name: 'name',
            description: 'description',
        });
        expect(entityStub.props.name).toBe('name');
        expect(entityStub.props.description).toBe('description');
        expect(entityStub.uuid).toBeInstanceOf(uuid_vo_1.UuidValueObject);
        expect(entityStub.id).not.toBeNull();
        expect(typeof entityStub.id).toBe('string');
        entityStub = new EntitySpecStub({
            name: 'name2',
            description: 'description2',
        }, new uuid_vo_1.UuidValueObject('f39f2172-f35b-4d8b-a9d2-8eea21edd7c9'));
        expect(entityStub.id).toBe('f39f2172-f35b-4d8b-a9d2-8eea21edd7c9');
        expect(entityStub.props.name).toBe('name2');
        expect(entityStub.props.description).toBe('description2');
    });
    it('should convert to json', () => {
        const entityStub = new EntitySpecStub({
            name: 'name',
            description: 'description',
        }, new uuid_vo_1.UuidValueObject('f39f2172-f35b-4d8b-a9d2-8eea21edd7c9'));
        expect(entityStub.toJSON()).toStrictEqual({
            id: 'f39f2172-f35b-4d8b-a9d2-8eea21edd7c9',
            name: 'name',
            description: 'description',
        });
    });
});
