import { z } from 'zod';
export declare const userAllDto: z.ZodEffects<z.ZodObject<{
    'x-page': z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
    'x-take': z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
}, "strip", z.ZodTypeAny, {
    'x-page': number;
    'x-take': number;
}, {
    'x-page'?: string | undefined;
    'x-take'?: string | undefined;
}>, {
    page: number;
    take: number;
}, {
    'x-page'?: string | undefined;
    'x-take'?: string | undefined;
}>;
export type IUserAllDto = z.output<typeof userAllDto>;
