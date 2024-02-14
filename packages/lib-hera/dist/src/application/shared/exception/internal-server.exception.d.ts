export declare class InternalServerException extends Error {
    readonly error?: Error | undefined;
    readonly code = 500;
    constructor(message: string, error?: Error | undefined);
}
