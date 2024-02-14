export declare const InjectableType: {
    SINGLETON: string;
    TRANSIENT: string;
};
export type IInjectable = {
    dep: string[];
    type: keyof typeof InjectableType;
    name?: string;
};
