export interface ISubscription {
  topic: string
  groupId?: string
  propertyKey: string
}
export function Subscription(props: Omit<ISubscription, 'propertyKey'>) {
  return function (target: any, propertyKey: string, descriptor: any) {
    const history =
      Reflect.getMetadata('subscription', target.constructor) || []
    history.push({ ...props, propertyKey })
    Reflect.defineMetadata('subscription', history, target.constructor)
    return descriptor
  }
}
