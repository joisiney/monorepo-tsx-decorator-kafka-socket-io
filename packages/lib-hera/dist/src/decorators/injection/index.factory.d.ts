import { type Type } from '../index.dto';
export declare class InjectorFactory {
    static raw: Map<string, any>;
    static instance: Map<string, any>;
    static resolve<T>(target: Type<T>): T;
}
