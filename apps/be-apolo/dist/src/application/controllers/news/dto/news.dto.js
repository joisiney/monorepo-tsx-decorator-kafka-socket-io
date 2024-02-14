"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsDto = void 0;
const zod_1 = require("zod");
exports.newsDto = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z
        .string({
        required_error: 'Título da notícia é obrigatório',
    })
        .transform((val) => val.trim()),
    description: zod_1.z
        .string({
        required_error: 'Descrição da notícia é obrigatória',
    })
        .transform((val) => val.trim()),
    content: zod_1.z
        .string({
        required_error: 'Conteúdo da notícia é obrigatório',
    })
        .transform((val) => val.trim()),
    thumbnail: zod_1.z
        .string({
        required_error: 'Thumbnail da notícia é obrigatório',
    })
        .url({
        message: 'Thumbnail da notícia deve ser uma URL válida',
    }),
});
