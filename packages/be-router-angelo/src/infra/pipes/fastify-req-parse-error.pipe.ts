import * as Exceptions from '@olympus/lib-hera/src/application/shared/exception'
import { IRoute } from '../adapters/route/index.dto'
const classesToCheck = Object.values(Exceptions)

export class TransformExceptionService {
  private stack: any = {}
  constructor(
    readonly controllerName: string,
    readonly url: string,
    readonly method: string,
    readonly error: Error,
  ) {
    if (this.controllerName !== 'ZodException') {
      this.stack = {
        controller: controllerName,
        ...this.stackErrorParse(this.error.stack ?? ''),
      }
    }
  }

  public execute() {
    const { is, name, error } = this.isMyException()
    if (is) {
      return {
        code: error.code,
        status: 'error',
        name,
        message: error.message,
        method: this.method,
        url: this.url,
        stack: this.stack,
      }
    }

    if (error.message && error.message.length > 0) {
      this.stack.sereverError = error.message
    } else if (error.toString().length > 0) {
      this.stack.sereverError = null
    }
    return {
      code: 500,
      status: 'error',
      name: 'InternalException',
      message: 'Erro interno no servidor',
      stack: this.stack,
    }
  }

  private stackErrorParse(stack: string) {
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

  private isMyException() {
    const [treatedError] = classesToCheck
      .map((myClasse) => {
        if (this.error instanceof myClasse) {
          return myClasse
        }
        return null
      })
      .filter(Boolean) as any as Exceptions.ZodException[]

    return {
      is: Boolean(treatedError),
      name: treatedError && treatedError.name,
      error: this.error as Exceptions.ZodException,
    }
  }
}

export const fastifyReqParseErrorPipe = async (
  acc: any,
  error: Error,
  { url, method }: IRoute.AddProps,
) => {
  const errorService = new TransformExceptionService(
    acc.name,
    url,
    method,
    error,
  )
  return errorService.execute()
}
