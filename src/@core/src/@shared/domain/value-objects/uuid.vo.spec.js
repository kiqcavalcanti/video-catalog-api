"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_vo_1 = require("./uuid.vo");
const invalid_uuid_error_1 = __importDefault(require("../exceptions/invalid-uuid.error"));
var spyOn = jest.spyOn;
describe('Uuid Value Object Unit Test', () => {
    const spyValidate = spyOn(uuid_vo_1.UuidValueObject.prototype, 'validate');
    it('should throw exception if is an invalid uuid string', () => {
        expect(() => new uuid_vo_1.UuidValueObject('invalid uuid')).toThrowError(invalid_uuid_error_1.default);
        expect(spyValidate).toBeCalledTimes(1);
    });
    it('should set correct values', () => {
        const uuid = new uuid_vo_1.UuidValueObject('d7f000d3-64cb-415b-98f0-5f1fd042dbd0');
        expect(uuid.value).toBe('d7f000d3-64cb-415b-98f0-5f1fd042dbd0');
        expect(spyValidate).toBeCalledTimes(1);
    });
});
