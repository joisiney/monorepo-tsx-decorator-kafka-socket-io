import { z } from 'zod';
export declare const userIdDto: z.ZodObject<{
    id: z.ZodEffects<z.ZodString, number, string>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string;
}>;
export type IUserIdDto = z.output<typeof userIdDto>;
