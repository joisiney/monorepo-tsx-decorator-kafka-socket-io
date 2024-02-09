import { type Type } from "../index.dto"

export class InjectorFactory {
  public static raw = new Map<string, any>()
  public static instance = new Map<string, any>()

  static resolve<T>(target: Type<T>): T {
    if (!target || !target.name) {
     console.error('Class not found')
     return null as T
    }
    const targetName = Reflect.getMetadata('target-name', target)
    if (InjectorFactory.instance.has(targetName)) {
      return InjectorFactory.instance.get(targetName)
    }
    const depsName = Reflect.getMetadata('dep', target)

    const depsInstance: any[] = []
    InjectorFactory.raw.forEach((value, key) => {
      if (depsName.includes(key)) {
        depsInstance.push(InjectorFactory.resolve(value))
      }
    })
    const typeInjection = Reflect.getMetadata('type', target)

    // eslint-disable-next-line new-cap
    const instance = new target(...depsInstance)
    if (typeInjection === 'SINGLETON') {
      InjectorFactory.instance.set(targetName, instance)
    }
    return instance as T

  }
}