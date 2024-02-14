"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateDto = void 0;
const date_fns_1 = require("date-fns");
const zod_1 = require("zod");
exports.userCreateDto = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Nome é obrigatório',
    })
        .transform((val) => val.trim()),
    email: zod_1.z
        .string({
        required_error: 'E-mail é obrigatória',
    })
        .email({
        message: 'E-mail inválido',
    }),
    address: zod_1.z
        .string().optional()
        .transform((val) => val ? val.trim() : null),
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
            return null;
        return (0, date_fns_1.parse)(val, 'yyyy-MM-dd', new Date());
    }),
    password: zod_1.z
        .string({
        required_error: 'Senha é obrigatória',
    }).min(6, {
        message: 'Senha deve ter no mínimo 6 caracteres',
    })
});
