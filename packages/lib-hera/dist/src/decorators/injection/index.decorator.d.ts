import { Type } from '../index.dto';
import { IInjectable } from './index.dto';
export declare function Injectable(props?: Partial<IInjectable>): <T>(target: Type<T>) => void;
