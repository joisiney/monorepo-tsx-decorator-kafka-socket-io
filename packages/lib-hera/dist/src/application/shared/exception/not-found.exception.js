"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
class NotFoundException extends Error {
    constructor(message, error) {
        super(message);
        this.error = error;
        this.code = 404;
        this.name = 'NotFoundException';
    }
}
exports.NotFoundException = NotFoundException;
