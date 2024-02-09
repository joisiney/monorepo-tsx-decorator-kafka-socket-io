export const InjectableType = {
  SINGLETON: 'SINGLETON',
  TRANSIENT: 'TRANSIENT',
}

export type IInjectable = {
  dep: string[]
  type: keyof typeof InjectableType
  name?: string
}
