import { Server } from 'socket.io'
import { IIoServer } from './index.dto'

export class IOServerService implements IIoServer.Implements {
  private _io!: Server
  constructor({ server, channels = [], options }: IIoServer.Props) {
    this._io = new Server(server, options)
    this._io.on('connection', (socket) => {
      console.info(`userId('${socket.id}') connected`)
      socket.on('disconnect', () => {
        console.info(`userId('${socket.id}') disconnected`)
      })
      channels.forEach((event) => {
        socket.on(event, (data) => {
          // Envia p todos os clientes inclusive o que enviou
          // socket.emit('message', message)
          // Envia p todos os clientes exceto o que enviou
          socket.broadcast.emit(event, data)
        })
      })
    })
    this._io.on('error', (error) => {
      console.error('error', error)
    })
  }
  public emitter(event: string, data: any) {
    this._io.emit(event, data)
  }
}
