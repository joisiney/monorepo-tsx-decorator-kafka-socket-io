import { z } from 'zod';
export declare const newsKeyDto: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type INewsKeyDto = z.infer<typeof newsKeyDto>;
