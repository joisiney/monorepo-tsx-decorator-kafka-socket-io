"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
function Route({ method, url, dto }) {
    return function (target, propertyKey, descriptor) {
        const history = Reflect.getMetadata('routes', target.constructor) || [];
        history.push({ method, propertyKey, url, dto });
        Reflect.defineMetadata('routes', history, target.constructor);
        return descriptor;
    };
}
exports.Route = Route;
