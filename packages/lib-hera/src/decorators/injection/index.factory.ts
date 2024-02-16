import { Type } from '../index.dto'
import { IInjectable } from './index.dto'

export class InjectorFactory {
  public static raw = new Map<string, any>()
  public static instance = new Map<string, any>()

  static resolve<T>(
    target: Type<T>,
    props?: Partial<IInjectable> & { defaultArgs?: any },
  ): T {
    if (!target || !target.name) {
      console.error('Class not found')
      return null as any as T
    }
    let targetName = Reflect.getMetadata('target-name', target)
    if (props?.dep || props?.type || props?.name || !targetName) {
      Reflect.defineMetadata('dep', (props && props.dep) ?? [], target)
      Reflect.defineMetadata(
        'type',
        (props && props.type) ?? 'SINGLETON',
        target,
      )
      Reflect.defineMetadata(
        'target-name',
        (props && props.name) ?? target.name,
        target,
      )
      InjectorFactory.raw.set((props && props.name) ?? target.name, target)
    }
    targetName = targetName ?? Reflect.getMetadata('target-name', target)

    if (InjectorFactory.instance.has(targetName)) {
      return InjectorFactory.instance.get(targetName)
    }
    const depsName = Reflect.getMetadata('dep', target)
    const depsInstance: any[] = depsName.map((dep: string) => {
      if (!InjectorFactory.raw.has(dep)) {
        console.error(`Dependency ${dep} not found`)
        return null
      }
      return InjectorFactory.resolve(InjectorFactory.raw.get(dep))
    })

    const typeInjection = Reflect.getMetadata('type', target)

    if (props && props.defaultArgs) {
      depsInstance.push(props.defaultArgs)
    }

    // eslint-disable-next-line new-cap
    const instance = new target(...depsInstance.flat())
    if (typeInjection === 'SINGLETON') {
      InjectorFactory.instance.set(targetName, instance)
    }
    return instance as T
  }
}
