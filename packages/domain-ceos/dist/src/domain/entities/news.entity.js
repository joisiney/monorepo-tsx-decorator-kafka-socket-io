"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsEntity = void 0;
class NewsEntity {
    constructor(_data) {
        this.data = {
            ..._data,
            id: _data.id || crypto.randomUUID(),
            createdAt: _data.createdAt || new Date(),
        };
    }
    get id() {
        return this.data.id;
    }
    get db() {
        return this.data;
    }
    get title() {
        return this.data.title;
    }
    toJSON() {
        const { createdAt, ...data } = this.data;
        return data;
    }
}
exports.NewsEntity = NewsEntity;
