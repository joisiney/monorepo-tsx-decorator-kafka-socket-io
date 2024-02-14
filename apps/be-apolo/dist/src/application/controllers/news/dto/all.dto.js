"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsAllDto = void 0;
const zod_1 = require("zod");
exports.newsAllDto = zod_1.z
    .object({
    'x-page': zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? +val.trim() : 1)),
    'x-take': zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? +val.trim() : 10)),
})
    .transform((val) => {
    return {
        page: val['x-page'],
        take: val['x-take'],
    };
});
