"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationEntity = void 0;
class PaginationEntity {
    constructor(props) {
        if ('data' in props) {
            this.hydrate(props);
        }
        else {
            this._page = props.page;
            this._take = props.take;
            this.boot(props);
        }
    }
    boot(props) {
        this._skip = (props.page - 1) * props.take;
    }
    hydrate(props) {
        this._data = props.data;
        this._page = props.page;
        this._take = props.take;
        this._skip = props.skip;
        this._pages = props.pages;
        this._total = props.total;
    }
    set data(value) {
        this._data = value;
    }
    get data() {
        return this._data;
    }
    get skip() {
        return this._skip;
    }
    get take() {
        return this._take;
    }
    get page() {
        return this._page;
    }
    get pages() {
        return this._pages;
    }
    get total() {
        return this._total;
    }
    set total(value) {
        this._pages = Math.ceil(value / this._take);
        this._total = value;
    }
    get pointer() {
        return {
            skip: (this.page - 1) * this.take,
            take: this.take,
        };
    }
    toJSON() {
        const result = {
            page: this._page,
            take: this._take,
            skip: this._skip,
            pages: this._pages,
            total: this._total,
            data: this._data,
        };
        return result;
    }
}
exports.PaginationEntity = PaginationEntity;
