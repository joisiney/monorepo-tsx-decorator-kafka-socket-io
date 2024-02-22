export const findMetaData = <T>(target: any, key: string, defaultValue: T) => {
  const response = Reflect.getMetadata(key, target)
  return response ?? defaultValue
}
