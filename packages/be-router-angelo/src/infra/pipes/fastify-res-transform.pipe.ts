import { PaginationEntity } from '@olympus/domain-ceos'

export const fastifyResTransformPipe = async (acc: any) => {
  let response: { [key: string]: unknown } = {
    code: 200,
    status: 'success',
    data: typeof acc === 'boolean' ? acc : undefined,
  }

  if (response.data === undefined && ['object', 'array'].includes(typeof acc)) {
    if (acc instanceof PaginationEntity) {
      response = {
        ...response,
        ...acc.toJSON(),
      }
    } else {
      response = {
        ...response,
        data: acc,
      }
    }
  }
  return {
    code: response.code as number,
    data: JSON.stringify(response),
  }
}
