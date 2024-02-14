"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = void 0;
class InternalServerException extends Error {
    constructor(message, error) {
        super(message);
        this.error = error;
        this.code = 500;
        this.name = 'InternalServerException';
    }
}
exports.InternalServerException = InternalServerException;
