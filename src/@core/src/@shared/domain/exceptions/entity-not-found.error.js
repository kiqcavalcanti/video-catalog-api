"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EntityNotFoundByIdError';
    }
}
exports.default = EntityNotFoundError;
