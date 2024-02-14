export declare namespace IController {
    interface IGenericObject {
        [key: string]: string;
    }
    interface IRequest {
        params?: IGenericObject;
        query?: IGenericObject;
        body?: IGenericObject;
        headers: IGenericObject;
        ip: string;
        ips: string[];
        socket: IGenericObject;
    }
    interface IResponse {
        status(code: number): IResponse;
        header(key: string, value: string): IResponse;
        send(response: any): void;
    }
}
