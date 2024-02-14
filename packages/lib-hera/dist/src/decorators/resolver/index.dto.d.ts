import { z } from 'zod';
export declare namespace IRoute {
    type Props = {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
        url: string;
        dto?: z.ZodObject<any> | z.ZodEffects<any, any>;
    };
}
