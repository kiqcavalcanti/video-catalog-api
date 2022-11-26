"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_object_1 = require("./value-object");
class ValueObjectStub extends value_object_1.ValueObject {
}
describe('Value Object Unit Test', () => {
    it('should receive correct value', () => {
        let vo = new ValueObjectStub('string value');
        expect(vo.value).toBe('string value');
        vo = new ValueObjectStub({ prop1: 'value1' });
        expect(vo.value).toStrictEqual({ prop1: 'value1' });
    });
});
