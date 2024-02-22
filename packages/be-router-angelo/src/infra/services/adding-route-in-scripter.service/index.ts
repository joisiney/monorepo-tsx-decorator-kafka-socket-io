import { InjectorFactory } from '@olympus/be-di-ilitia'
import { findMetaData, urlFormat } from '../../../utils'
import { IRoute } from '../../adapters/route/index.dto'

export class AddingRouteInScripterSingleton {
  constructor(private readonly app: IRoute.Implements) {}

  private create(target: any) {
    const path = findMetaData(target.constructor, 'path', [])
    const routes = findMetaData(target.constructor, 'routes', [])
    for (const { method, propertyKey, url: rawUrl, dto } of routes) {
      if (!method || !rawUrl) continue
      const url = urlFormat(path, rawUrl)
      this.app.addRoute({
        method,
        url,
        dto,
        target,
        propertyKey,
      })
    }
  }

  private static instance: AddingRouteInScripterSingleton
  public static getInstance(app: IRoute.Implements) {
    if (!AddingRouteInScripterSingleton.instance) {
      AddingRouteInScripterSingleton.instance =
        new AddingRouteInScripterSingleton(app)
      InjectorFactory.use(
        AddingRouteInScripterSingleton.instance.create.bind(
          AddingRouteInScripterSingleton.instance,
        ),
      )
    }
    return AddingRouteInScripterSingleton.instance
  }
}
