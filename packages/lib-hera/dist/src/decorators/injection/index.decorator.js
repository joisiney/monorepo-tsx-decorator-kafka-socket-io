"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
const index_factory_1 = require("./index.factory");
function Injectable(props) {
    const data = {
        dep: [],
        type: 'SINGLETON',
        ...props,
    };
    return function (target) {
        const targetName = data.name ?? target.name;
        index_factory_1.InjectorFactory.raw.set(targetName, target);
        Reflect.defineMetadata('dep', data.dep, target);
        Reflect.defineMetadata('type', data.type, target);
        Reflect.defineMetadata('target-name', targetName, target);
    };
}
exports.Injectable = Injectable;
