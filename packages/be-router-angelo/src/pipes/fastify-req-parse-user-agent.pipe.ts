import useragent from 'useragent'
export const fastifyReqParseUserAgentPipe = async <
  IRequest extends { [key: string]: any },
>(
  acc: any,
  request: IRequest,
) => {
  const agent = useragent.parse(request?.headers?.['user-agent'] ?? '')
  return {
    ...acc,
    userAgent: {
      family: agent.family,
      version: agent.toVersion(),
      browser: agent.toAgent(),
      os: agent.os.toString(),
      devide: agent.device.toString(),
    },
  }
}
