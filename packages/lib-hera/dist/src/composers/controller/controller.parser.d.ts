import { z } from 'zod';
import { ControllerParams } from './controller.params';
export declare class ControllerParamsParser {
    private readonly raw;
    parseTo(dto: z.ZodObject<any> | z.ZodEffects<any, any>): any;
    constructor(raw: ControllerParams);
}
