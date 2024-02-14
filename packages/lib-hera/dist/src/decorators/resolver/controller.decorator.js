"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
function Controller(path = '') {
    return function (target) {
        const pathFormatted = path
            .replace(/^\/|\/$/g, '')
            .split('/')
            .filter(Boolean);
        Reflect.defineMetadata('path', pathFormatted, target);
    };
}
exports.Controller = Controller;
