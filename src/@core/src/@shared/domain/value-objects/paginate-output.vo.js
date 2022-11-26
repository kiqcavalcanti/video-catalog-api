"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateOutput = void 0;
const value_object_1 = require("./value-object");
class PaginateOutput extends value_object_1.ValueObject {
    constructor(props) {
        var _a, _b;
        super(props);
        this.collection = props.collection;
        this.total = props.total;
        this.currentPage = props.currentPage;
        this.perPage = props.perPage;
        this.filter = (_a = props.filter) !== null && _a !== void 0 ? _a : null;
        this.orderBy = (_b = props.orderBy) !== null && _b !== void 0 ? _b : null;
        this.lastPage = Math.ceil(this.total / this.perPage);
    }
    toJSON(forceEntity = false) {
        var _a, _b;
        return {
            collection: forceEntity
                ? this.collection.map((item) => item.toJSON())
                : this.collection,
            total: this.total,
            currentPage: this.currentPage,
            perPage: this.perPage,
            lastPage: Math.ceil(this.total / this.perPage),
            orderBy: (_a = this.orderBy) !== null && _a !== void 0 ? _a : null,
            filter: (_b = this.filter) !== null && _b !== void 0 ? _b : null,
        };
    }
}
exports.PaginateOutput = PaginateOutput;
