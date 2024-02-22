import { InjectorFactory } from '@olympus/lib-hera'
import { findMetaData } from './find-meta-data.util'
import { urlFormat } from './url-format.util'

export const routesInfo = () => {
  const itens: any = []
  InjectorFactory.instance.forEach((instance) => {
    const path = findMetaData(instance.constructor, 'path', [])
    const routes = findMetaData(instance.constructor, 'routes', [])
    if (routes.length > 0) {
      routes.forEach((route: any) => {
        const { method, propertyKey, url: rawUrl } = route
        const url = urlFormat(path, rawUrl)
        itens.push({
          className: instance.constructor.name,
          classMethod: propertyKey,
          httpMethod: method,
          url,
        })
      })
    }
  })
  return itens
}
