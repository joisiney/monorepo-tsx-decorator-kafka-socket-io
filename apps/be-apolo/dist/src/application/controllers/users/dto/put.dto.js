"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateDto = void 0;
const date_fns_1 = require("date-fns");
const zod_1 = require("zod");
exports.userUpdateDto = zod_1.z
    .object({
    id: zod_1.z.string({
        required_error: 'Id da notícia é obrigatório',
    }).transform((val) => +val.trim()),
    name: zod_1.z
        .string().optional()
        .transform((val) => val ? val.trim() : val),
    email: zod_1.z
        .string()
        .email({
        message: 'E-mail inválido',
    }).optional(),
    address: zod_1.z
        .string().optional()
        .transform((val) => val ? val.trim() : val),
    birthdate: zod_1.z
        .string().optional()
        .refine((val) => {
        if (!val)
            return true;
        const date = (0, date_fns_1.parse)(val, 'yyyy-MM-dd', new Date());
        return (0, date_fns_1.isValid)(date);
    }, {
        message: 'Data de nascimento inválida',
    })
        .transform((val) => {
        if (!val)
            return undefined;
        return (0, date_fns_1.parse)(val, 'yyyy-MM-dd', new Date());
    }),
})
    .refine((data) => {
    return Object.keys(data).length > 1;
}, {
    message: 'É necessário informar pelo menos um campo para atualização',
});
