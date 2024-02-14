import { z } from 'zod';
export declare const newsDto: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodEffects<z.ZodString, string, string>;
    description: z.ZodEffects<z.ZodString, string, string>;
    content: z.ZodEffects<z.ZodString, string, string>;
    thumbnail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    id?: string | undefined;
}, {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    id?: string | undefined;
}>;
export type INewsDto = z.output<typeof newsDto>;
