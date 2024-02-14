import { z } from 'zod';
export declare const userUpdateDto: z.ZodEffects<z.ZodObject<{
    id: z.ZodEffects<z.ZodString, number, string>;
    name: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    email: z.ZodOptional<z.ZodString>;
    address: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    birthdate: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>, Date | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    birthdate?: Date | undefined;
}, {
    id: string;
    name?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    birthdate?: string | undefined;
}>, {
    id: number;
    name?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    birthdate?: Date | undefined;
}, {
    id: string;
    name?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    birthdate?: string | undefined;
}>;
export type IUserUpdateDto = z.output<typeof userUpdateDto>;
