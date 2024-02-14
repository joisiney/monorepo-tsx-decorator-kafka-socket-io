"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = void 0;
class Right {
    constructor(_value) {
        this._value = _value;
    }
    get isError() {
        return false;
    }
    get isSuccess() {
        return true;
    }
    get value() {
        return this._value;
    }
    get error() {
        throw new Error('Não é possível obter erro da direita.');
    }
    lanchError() {
        throw new Error('Não é possível obter erro da direita.');
    }
}
exports.Right = Right;
