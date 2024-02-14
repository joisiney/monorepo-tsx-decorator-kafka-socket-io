import { z } from 'zod';
export declare const userCreateDto: z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString;
    address: z.ZodEffects<z.ZodOptional<z.ZodString>, string | null, string | undefined>;
    birthdate: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>, Date | null, string | undefined>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    address: string | null;
    birthdate: Date | null;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
    address?: string | undefined;
    birthdate?: string | undefined;
}>;
export type IUserCreateDto = z.output<typeof userCreateDto>;
