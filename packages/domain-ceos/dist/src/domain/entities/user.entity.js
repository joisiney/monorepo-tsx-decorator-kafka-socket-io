"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(_data) {
        this.data = {
            ..._data,
            createdAt: _data.createdAt || new Date(),
        };
    }
    get id() {
        return this.data.id;
    }
    get db() {
        return this.data;
    }
    toJSON() {
        const { password, ...data } = this.data;
        return data;
    }
}
exports.UserEntity = UserEntity;
