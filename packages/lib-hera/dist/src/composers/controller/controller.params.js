"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerParams = void 0;
const tslib_1 = require("tslib");
const useragent_1 = tslib_1.__importDefault(require("useragent"));
class ControllerParams {
    get userAgenteParser() {
        const userAgent = this.request.headers['user-agent'];
        const agent = useragent_1.default.parse(userAgent);
        return {
            family: agent.family,
            version: agent.toVersion(),
            ip: this.request.ip,
            ipRaw: this.request.ip ?? '',
            ips: this.request.ips ?? [],
            ipRemote: this.request?.socket?.remoteAddress,
            browser: agent.toAgent(),
            os: agent.os.toString(),
            devide: agent.device.toString(),
        };
    }
    get params() {
        return {
            ...(this.request.params ?? {}),
            ...(this.request.query ?? {}),
            ...(this.request.body ?? {}),
            ...this.request.headers,
            userAgent: this.userAgenteParser,
        };
    }
    constructor(request) {
        this.request = request;
    }
}
exports.ControllerParams = ControllerParams;
