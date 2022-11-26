"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateInput = void 0;
const value_object_1 = require("./value-object");
class PaginateInput extends value_object_1.ValueObject {
    constructor(props = {}) {
        var _a, _b, _c, _d;
        super(props);
        this._page = 1;
        this._perPage = 15;
        this._filter = null;
        this._orderBy = null;
        this.page = (_a = props.page) !== null && _a !== void 0 ? _a : 1;
        this.perPage = (_b = props.perPage) !== null && _b !== void 0 ? _b : 15;
        this.filter = (_c = props.filter) !== null && _c !== void 0 ? _c : null;
        this.orderBy = (_d = props.orderBy) !== null && _d !== void 0 ? _d : null;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        if (value < 1 || parseInt(value) !== value) {
            this._page = 1;
            return;
        }
        this._page = value;
    }
    get perPage() {
        return this._perPage;
    }
    set perPage(value) {
        if (value < 1 || parseInt(value) !== value) {
            this._perPage = 15;
            return;
        }
        this._perPage = value;
    }
    get orderBy() {
        return this._orderBy;
    }
    set orderBy(value) {
        this._orderBy = value;
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter =
            value === null || value === undefined || value === '' ? null : value;
    }
}
exports.PaginateInput = PaginateInput;
