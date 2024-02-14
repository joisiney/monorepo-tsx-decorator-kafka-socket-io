"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectorFactory = void 0;
class InjectorFactory {
    static resolve(target) {
        if (!target || !target.name) {
            console.error('Class not found');
            return null;
        }
        const targetName = Reflect.getMetadata('target-name', target);
        if (InjectorFactory.instance.has(targetName)) {
            return InjectorFactory.instance.get(targetName);
        }
        const depsName = Reflect.getMetadata('dep', target);
        const depsInstance = depsName.map((dep) => {
            if (!InjectorFactory.raw.has(dep)) {
                console.error(`Dependency ${dep} not found`);
                return null;
            }
            return InjectorFactory.resolve(InjectorFactory.raw.get(dep));
        });
        const typeInjection = Reflect.getMetadata('type', target);
        // eslint-disable-next-line new-cap
        const instance = new target(...depsInstance);
        if (typeInjection === 'SINGLETON') {
            InjectorFactory.instance.set(targetName, instance);
        }
        return instance;
    }
}
exports.InjectorFactory = InjectorFactory;
InjectorFactory.raw = new Map();
InjectorFactory.instance = new Map();
