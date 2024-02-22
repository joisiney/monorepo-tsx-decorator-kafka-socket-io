import { InjectorFactory } from '@olympus/lib-hera'
import { IRoute } from '../../adapters/route/index.dto'
import { findMetaData, urlFormat } from '../../utils'

export class AddingRouteInScripter {
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

  private static instance: AddingRouteInScripter
  public static getInstance(app: IRoute.Implements) {
    if (!AddingRouteInScripter.instance) {
      AddingRouteInScripter.instance = new AddingRouteInScripter(app)
      InjectorFactory.use(
        AddingRouteInScripter.instance.create.bind(
          AddingRouteInScripter.instance,
        ),
      )
    }
    return AddingRouteInScripter.instance
  }
}
