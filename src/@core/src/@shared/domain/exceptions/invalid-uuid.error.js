"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidUuidError extends Error {
    constructor() {
        super('Id must be a valid UUID');
        this.name = 'InvalidUuidError';
    }
}
exports.default = InvalidUuidError;
