import { IRoute } from '../adapters/route/index.dto'

export const fastifyResTriggerControllerPipe = async <
  IReply extends { [key: string]: any },
>(
  acc: any,
  _: IReply,
  { target, propertyKey }: IRoute.AddProps,
) => {
  const handler = target[propertyKey].bind(target)
  const result = acc ? await handler(acc) : await handler()
  return result
}
