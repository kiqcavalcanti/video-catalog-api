"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entity_1 = require("../../../@shared/domain/entities/entity");
class Category extends entity_1.Entity {
    constructor(props, uuid) {
        var _a, _b, _c;
        super(props, uuid);
        this.description = (_a = this.props.description) !== null && _a !== void 0 ? _a : null;
        this.isActive = (_b = this.props.isActive) !== null && _b !== void 0 ? _b : true;
        this.props.createdAt = (_c = this.props.createdAt) !== null && _c !== void 0 ? _c : new Date();
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    get isActive() {
        return this.props.isActive;
    }
    set isActive(value) {
        this.props.isActive = value;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    update(props) {
        this.name = props.name;
        this.description = props.description;
    }
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}
exports.Category = Category;
