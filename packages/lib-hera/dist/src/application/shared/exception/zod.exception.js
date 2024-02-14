"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodException = void 0;
class ZodException extends Error {
    constructor(zodError) {
        super('ZodException: unknown');
        this.code = 400;
        let msg = this.message;
        const errors = zodError.issues ?? zodError.errors ?? [];
        if (errors.length > 0) {
            const error = errors[0];
            msg = error.message;
        }
        else if (zodError.message) {
            msg = zodError.message;
        }
        this.message = msg;
    }
}
exports.ZodException = ZodException;
