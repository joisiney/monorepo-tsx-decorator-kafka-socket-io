"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
class BadRequestException extends Error {
    constructor(message, error) {
        super(message);
        this.error = error;
        this.code = 400;
        this.name = 'BadRequestException';
    }
}
exports.BadRequestException = BadRequestException;
