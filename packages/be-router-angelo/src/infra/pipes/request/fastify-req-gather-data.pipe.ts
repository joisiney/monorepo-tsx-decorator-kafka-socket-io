export const fastifyReqGatherDataPipe = async <
  IRequest extends { [key: string]: any },
>(
  acc: any,
  request: IRequest,
) => {
  const unionInfoRequest = {
    ...acc,
    ...(request.params ?? {}),
    ...(request.query ?? {}),
    ...(request.body ?? {}),
    ip: request.ip,
    ...request.headers,
    remoteAddress: request?.socket?.remoteAddress,
  }
  return unionInfoRequest
}
