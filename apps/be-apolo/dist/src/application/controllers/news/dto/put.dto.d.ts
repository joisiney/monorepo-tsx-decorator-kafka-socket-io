import { z } from 'zod';
export declare const newsUpdateDto: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    content?: string | undefined;
    thumbnail?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    content?: string | undefined;
    thumbnail?: string | undefined;
}>, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    content?: string | undefined;
    thumbnail?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    content?: string | undefined;
    thumbnail?: string | undefined;
}>;
export type INewsUpdateDto = z.output<typeof newsUpdateDto>;
