import * as Exceptions from '@olympus/lib-hera/src/application/shared/exception'
const classesToCheck = Object.values(Exceptions)
classesToCheck.shift()

export const fastifyResPresentationErrorPipe = async (
  { is, ...acc }: any,
  error: Error,
) => {
  if (is) {
    return {
      ...acc,
      message: error.message,
      code: 'code' in error ? error.code : 500,
    }
  }
  if (error.message && error.message.length > 0) {
    acc.stack.sereverError = error.message
  } else if (error.toString().length > 0) {
    acc.stack.sereverError = null
  }
  return {
    code: 500,
    status: 'error',
    name: 'InternalException',
    message: 'Erro interno no servidor',
    stack: acc.stack,
  }
}
