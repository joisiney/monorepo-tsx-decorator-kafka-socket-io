import useragent from 'useragent'
import { IController } from './index.dto'

export class ControllerParams {
  private get userAgenteParser() {
    const userAgent = this.request.headers['user-agent']
    const agent = useragent.parse(userAgent)
    return {
      family: agent.family,
      version: agent.toVersion(),
      ip: this.request.ip,
      ipRaw: this.request.ip ?? '',
      ips: this.request.ips ?? [],
      ipRemote: this.request?.socket?.remoteAddress,
      browser: agent.toAgent(),
      os: agent.os.toString(),
      devide: agent.device.toString(),
    }
  }

  public get params() {
    return {
      ...(this.request.params ?? {}),
      ...(this.request.query ?? {}),
      ...(this.request.body ?? {}),
      ...this.request.headers,
      userAgent: this.userAgenteParser,
    }
  }

  constructor(private readonly request: IController.IRequest) {}
}
