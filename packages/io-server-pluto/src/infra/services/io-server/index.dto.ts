import http from 'http'
export namespace IIoServer {
  export interface Implements {
    emitter(event: string, data: any): void
  }
  export interface Props {
    channels: string[]
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
    options?: Record<string, unknown>
  }
}
