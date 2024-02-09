import { Type } from '../index.dto'
import { IInjectable } from './index.dto'
import { InjectorFactory } from './index.factory'

export function Injectable(props?: Partial<IInjectable>) {
  const data: IInjectable = {
    dep: [],
    type: 'SINGLETON',
    ...props,
  }
  return function <T>(target: Type<T>) {
    const targetName = data.name ?? target.name
    InjectorFactory.raw.set(targetName, target)
    Reflect.defineMetadata('dep', data.dep, target)
    Reflect.defineMetadata('type', data.type, target)
    Reflect.defineMetadata('target-name', targetName, target)
  }
}
