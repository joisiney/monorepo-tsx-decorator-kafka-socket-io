import { IRoute } from './index.dto';
export declare function Route({ method, url, dto }: IRoute.Props): (target: any, propertyKey: string, descriptor: any) => any;
