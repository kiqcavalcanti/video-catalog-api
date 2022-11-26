"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidValueObject = void 0;
const uuid_1 = require("uuid");
const invalid_uuid_error_1 = __importDefault(require("../exceptions/invalid-uuid.error"));
const value_object_1 = require("./value-object");
class UuidValueObject extends value_object_1.ValueObject {
    constructor(_value = null) {
        super(_value !== null && _value !== void 0 ? _value : (0, uuid_1.v4)());
        this.validate();
    }
    get value() {
        return this._value;
    }
    validate() {
        if (!(0, uuid_1.validate)(this.value)) {
            throw new invalid_uuid_error_1.default();
        }
    }
}
exports.UuidValueObject = UuidValueObject;
