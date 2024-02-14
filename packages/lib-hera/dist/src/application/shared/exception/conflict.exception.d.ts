export declare class ConflictException extends Error {
    readonly error?: Error | undefined;
    readonly code = 409;
    constructor(message: string, error?: Error | undefined);
}
