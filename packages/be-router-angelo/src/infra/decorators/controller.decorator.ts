export function Controller(path: string = '') {
  return function (target: any) {
    const pathFormatted = path
      .replace(/^\/|\/$/g, '')
      .split('/')
      .filter(Boolean)
    Reflect.defineMetadata('path', pathFormatted, target)
  }
}
