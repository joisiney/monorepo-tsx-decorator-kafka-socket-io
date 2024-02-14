export declare class ZodException extends Error {
    readonly code = 400;
    constructor(zodError: any);
}
