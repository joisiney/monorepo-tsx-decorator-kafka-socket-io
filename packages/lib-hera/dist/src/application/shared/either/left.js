"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Left = void 0;
class Left {
    constructor(_error) {
        this._error = _error;
    }
    get isError() {
        return true;
    }
    get isSuccess() {
        return false;
    }
    get value() {
        throw new Error(`Não é possível obter valor da esquerda. Erro: ${this._error}`);
    }
    get error() {
        return this._error;
    }
    lanchError() {
        throw this.error;
    }
}
exports.Left = Left;
