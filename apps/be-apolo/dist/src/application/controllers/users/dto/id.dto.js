"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdDto = void 0;
const zod_1 = require("zod");
exports.userIdDto = zod_1.z.object({
    id: zod_1.z
        .string({
        required_error: 'ID é obrigatório',
    })
        .transform((val) => +val.trim()),
});
