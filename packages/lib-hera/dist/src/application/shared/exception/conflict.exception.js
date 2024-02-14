"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
class ConflictException extends Error {
    constructor(message, error) {
        super(message);
        this.error = error;
        this.code = 409;
        this.name = 'ConflictException';
    }
}
exports.ConflictException = ConflictException;
