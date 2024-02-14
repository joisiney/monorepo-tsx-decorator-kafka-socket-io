export declare class NotFoundException extends Error {
    readonly error?: Error | undefined;
    readonly code = 404;
    constructor(message: string, error?: Error | undefined);
}
