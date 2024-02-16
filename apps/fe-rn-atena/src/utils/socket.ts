import { Socket as ISocket, io } from 'socket.io-client'
import envVars from './envVars'

export class Socket {
  private static instance: ISocket | undefined
  public static getInstance() {
    if (!Socket.instance) {
      Socket.instance = io(envVars.baseURLApolo, {
        transports: ['websocket'],
      })
    }
    return Socket.instance
  }
  public static unmount() {
    if (!Socket.instance) return
    Socket.instance.disconnect()
    Socket.instance.close()
    Socket.instance = undefined
  }
}
