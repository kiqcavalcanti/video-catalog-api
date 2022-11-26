"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const uuid_vo_1 = require("../value-objects/uuid.vo");
class Entity {
    constructor(props, uuid) {
        this.props = props;
        this.uuid = uuid || new uuid_vo_1.UuidValueObject();
    }
    get id() {
        return this.uuid.value;
    }
    toJSON() {
        return Object.assign({ id: this.id }, this.props);
    }
}
exports.Entity = Entity;
