export declare class TransformExceptionService {
    #private;
    readonly controllerName: string;
    readonly url: string;
    readonly method: string;
    readonly error: Error;
    constructor(controllerName: string, url: string, method: string, error: Error);
    execute(): {
        code: number;
        status: string;
        name: string;
        message: string;
        method: string;
        url: string;
        stack: any;
    } | {
        code: number;
        status: string;
        name: string;
        message: string;
        stack: any;
        method?: undefined;
        url?: undefined;
    };
    private stackErrorParse;
    private isMyException;
}
