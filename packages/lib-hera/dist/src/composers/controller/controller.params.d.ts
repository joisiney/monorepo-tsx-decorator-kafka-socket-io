import { IController } from './index.dto';
export declare class ControllerParams {
    private readonly request;
    private get userAgenteParser();
    get params(): {
        userAgent: {
            family: string;
            version: string;
            ip: string;
            ipRaw: string;
            ips: string[];
            ipRemote: string;
            browser: string;
            os: string;
            devide: string;
        };
    };
    constructor(request: IController.IRequest);
}
