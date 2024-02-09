import { Type } from '../index.dto'

export function Controller(path: string = '') {
  return function <T>(target: Type<T>) {
    const pathFormatted = path
      .replace(/^\/|\/$/g, '')
      .split('/')
      .filter(Boolean)
    Reflect.defineMetadata('path', pathFormatted, target)
  }
}
