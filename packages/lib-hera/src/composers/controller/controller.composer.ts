import { TransformExceptionService } from '../../application/services/transform-exception.service'
import { InjectorFactory } from '../../decorators/injection'
import { ControllerParams } from './controller.params'
import { ControllerParamsParser } from './controller.parser'
import { IController } from './index.dto'

export class ControllerComposer {
  constructor() {
    if (!InjectorFactory.instance.has('PluginRouter')) {
      throw new Error(
        'It is necessary to inject the pluginrater into the dependency container',
      )
    }
    const app = InjectorFactory.instance.get('PluginRouter')
    const path = (Reflect.getMetadata('path', this.constructor) ??
      []) as string[]
    const routes = Reflect.getMetadata('routes', this.constructor) ?? []
    const logger = []
    for (const { method, propertyKey, url: rawUrl, dto } of routes) {
      let url = '/'
      url += [...path, ...rawUrl.split('/').filter(Boolean)].join('/')
      logger.push({
        CONTROLLER: this.constructor.name,
        METHOD: method,
        LINK: url,
      })
      app.route({
        method,
        url,
        handler: async (
          request: IController.IRequest,
          reply: IController.IResponse,
        ) => {
          try {
            const parent = this as any as {
              [key: string]: (props?: any) => Promise<any>
            }
            if (propertyKey in this) {
              const paramsService = new ControllerParams(request)
              const parsedService = new ControllerParamsParser(paramsService)
              const parseded = parsedService.parseTo(dto)
              const handler = parent[propertyKey].bind(parent)
              const result = parseded
                ? await handler(parseded)
                : await handler()

              const response = {
                code: 200,
                status: 'success',
                ...(typeof result === 'boolean' ? {} : result),
              }
              reply.status(response.code).send(response)
            }
            throw new Error('Method not found')
          } catch (error) {
            const errorService = new TransformExceptionService(
              this.constructor.name,
              url,
              method,
              error as Error,
            )
            const errorResponse = errorService.execute()
            reply.status(errorResponse.code).send(errorResponse)
          }
        },
      })
    }
    console.table(logger)
  }
}
