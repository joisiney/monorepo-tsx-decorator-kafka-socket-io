import { IRoute } from '../../../adapters/route/index.dto'
const stackErrorParse = (stack: string) => {
  const regex = /at (\w+)\.(\w+) \(([^:]+):(\d+):(\d+)\)/g
  const matches = stack.matchAll(regex)
  const { value } = matches.next()

  const [, className, , rawFile, start, end] = value ?? [
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  return {
    className,
    pathFile: rawFile?.split(/src|node_modules/)?.pop(),
    startLine: Number(start ?? -1),
    endLine: Number(end ?? -1),
  }
}
export const fastifyResGatherErrorPipe = async (
  acc: any,
  error: Error,
  { url, method }: IRoute.AddProps,
) => {
  const unionInfoRequest: any = {
    url,
    status: 'error',
    method,
  }
  if (acc.name !== 'ZodException') {
    unionInfoRequest.stack = {
      controller: acc.name,
      ...stackErrorParse(error.stack ?? ''),
    }
  }
  return unionInfoRequest
}
