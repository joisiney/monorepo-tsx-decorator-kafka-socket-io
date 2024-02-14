"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerParamsParser = void 0;
const shared_1 = require("../../application/shared");
class ControllerParamsParser {
    parseTo(dto) {
        if (!dto)
            return null;
        try {
            return dto.parse(this.raw.params);
        }
        catch (error) {
            throw new shared_1.ZodException(error);
        }
    }
    constructor(raw) {
        this.raw = raw;
    }
}
exports.ControllerParamsParser = ControllerParamsParser;
