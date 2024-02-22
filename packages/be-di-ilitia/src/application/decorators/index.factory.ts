import { IInjectable, Type } from './index.dto'

class InjectorFactoryService {
  public raw = new Map<string, any>()
  public instance = new Map<string, any>()
  private _use: Function[] = []

  public use(value: Function) {
    this._use.push(value)
  }
  public resolve<T>(
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
      this.raw.set((props && props.name) ?? target.name, target)
    }
    targetName = targetName ?? Reflect.getMetadata('target-name', target)

    if (this.instance.has(targetName)) {
      return this.instance.get(targetName)
    }
    const depsName = Reflect.getMetadata('dep', target)
    const depsInstance: any[] = depsName.map((dep: string) => {
      if (!this.raw.has(dep)) {
        console.error(`Dependency ${dep} not found`)
        return null
      }
      return this.resolve(this.raw.get(dep))
    })

    const typeInjection = Reflect.getMetadata('type', target)

    if (props && props.defaultArgs) {
      depsInstance.push(props.defaultArgs)
    }

    // eslint-disable-next-line new-cap
    const instance = new target(...depsInstance.flat())
    this._use.forEach((use) => use(instance))
    if (typeInjection === 'SINGLETON') {
      this.instance.set(targetName, instance)
    }
    return instance as T
  }
}
export const InjectorFactory = new InjectorFactoryService()
