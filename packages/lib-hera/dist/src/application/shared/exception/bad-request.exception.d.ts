export declare class BadRequestException extends Error {
    readonly error?: Error | undefined;
    readonly code = 400;
    constructor(message: string, error?: Error | undefined);
}
