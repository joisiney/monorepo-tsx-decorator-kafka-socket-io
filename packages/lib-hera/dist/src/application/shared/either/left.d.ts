export declare class Left<R, L> {
    private readonly _error;
    constructor(_error: L);
    get isError(): boolean;
    get isSuccess(): boolean;
    get value(): R;
    get error(): L;
    lanchError(): void;
}
