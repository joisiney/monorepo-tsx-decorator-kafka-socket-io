"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsKeyDto = void 0;
const zod_1 = require("zod");
exports.newsKeyDto = zod_1.z.object({
    id: zod_1.z.string({
        required_error: 'Id da notícia é obrigatório',
    }),
});
