"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_entity_1 = require("./category.entity");
const uuid_1 = require("uuid");
const uuid_vo_1 = require("../../../@shared/domain/value-objects/uuid.vo");
const invalid_uuid_error_1 = __importDefault(require("../../../@shared/domain/exceptions/invalid-uuid.error"));
describe('Category Entity Unit Test', () => {
    test('Constuctor only required params', () => {
        const category = new category_entity_1.Category({ name: 'movie' });
        expect(category.name).toBe('movie');
        expect(category.id).toBeDefined();
        expect((0, uuid_1.validate)(category.id)).toBeTruthy();
        expect(category.description).toBeNull();
        expect(category.isActive).toBeTruthy();
        expect(category.createdAt).toBeDefined();
        expect(category.createdAt).toBeInstanceOf(Date);
    });
    test('Constructor Passing All Params And Changing Values', () => {
        const createdAt = new Date();
        const category = new category_entity_1.Category({
            name: 'movie',
            description: 'initial Description',
            createdAt,
            isActive: false,
        }, new uuid_vo_1.UuidValueObject('cd6b4391-a976-4dbb-82c2-59536a89118d'));
        expect(category.name).toBe('movie');
        expect((0, uuid_1.validate)(category.id)).toBeTruthy();
        expect(category.id).toBe('cd6b4391-a976-4dbb-82c2-59536a89118d');
        expect(category.description).toBe('initial Description');
        expect(category.isActive).not.toBeTruthy();
        expect(category.createdAt).toBe(createdAt);
        category.description = 'changing description';
        category.isActive = true;
        category.name = 'changing name';
        expect(category.description).toBe('changing description');
        expect(category.isActive).toBeTruthy();
        expect(category.name).toBe('changing name');
        expect(category.id).toBe('cd6b4391-a976-4dbb-82c2-59536a89118d');
        expect(category.createdAt).toBe(createdAt);
    });
    test('Constructor explicity passing null and undefined to not required props', () => {
        const category = new category_entity_1.Category({ name: 'serie', description: null, isActive: null }, null);
        expect(category.name).toBe('serie');
        expect(category.id).toBeDefined();
        expect((0, uuid_1.validate)(category.id)).toBeTruthy();
        expect(category.description).toBeNull();
        expect(category.isActive).toBeTruthy();
        expect(category.createdAt).toBeDefined();
        expect(category.createdAt).toBeInstanceOf(Date);
        const category2 = new category_entity_1.Category({ name: 'movie2', description: undefined, isActive: undefined }, undefined);
        expect(category2.name).toBe('movie2');
        expect(category2.id).toBeDefined();
        expect((0, uuid_1.validate)(category2.id)).toBeTruthy();
        expect(category2.description).toBeNull();
        expect(category2.isActive).toBeTruthy();
        expect(category2.createdAt).toBeDefined();
        expect(category2.createdAt).toBeInstanceOf(Date);
    });
    test('Passing invalid uuid', () => {
        expect(() => new category_entity_1.Category({ name: 'movie' }, new uuid_vo_1.UuidValueObject('invalid uuid'))).toThrow(new invalid_uuid_error_1.default());
    });
    it('should update', () => {
        const category = new category_entity_1.Category({
            name: 'movie',
            description: 'lorem',
        });
        expect(category.name).toBe('movie');
        expect(category.description).toBe('lorem');
        category.update({ name: 'documentary', description: 'lorem' });
        expect(category.name).toBe('documentary');
        expect(category.description).toBe('lorem');
        category.update({ description: null, name: 'test' });
        expect(category.name).toBe('test');
        expect(category.description).toBeNull();
    });
    it('should activate', () => {
        const category = new category_entity_1.Category({
            name: 'movie',
            description: 'lorem',
            isActive: false,
        });
        category.activate();
        expect(category.isActive).toBeTruthy();
    });
    it('should deactivate', () => {
        const category = new category_entity_1.Category({
            name: 'movie',
            description: 'lorem',
            isActive: true,
        });
        category.deactivate();
        expect(category.isActive).not.toBeTruthy();
    });
});
