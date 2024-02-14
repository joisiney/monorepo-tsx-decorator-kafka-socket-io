export declare class Right<R, L> {
    private readonly _value;
    constructor(_value: R);
    get isError(): boolean;
    get isSuccess(): boolean;
    get value(): R;
    get error(): L;
    lanchError(): void;
}
