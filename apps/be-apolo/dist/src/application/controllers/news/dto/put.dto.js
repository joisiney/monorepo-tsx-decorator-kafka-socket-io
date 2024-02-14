"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsUpdateDto = void 0;
const zod_1 = require("zod");
exports.newsUpdateDto = zod_1.z
    .object({
    id: zod_1.z.string({
        required_error: 'Id da notícia é obrigatório',
    }),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    thumbnail: zod_1.z
        .string()
        .url({
        message: 'Thumbnail da notícia deve ser uma URL válida',
    })
        .optional(),
})
    .refine((data) => {
    return Object.keys(data).length > 1;
}, {
    message: 'É necessário informar pelo menos um campo para atualização',
});
