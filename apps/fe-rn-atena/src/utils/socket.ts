import { Socket as ISocket, io } from 'socket.io-client'

export class Socket {
  private static instance: ISocket | undefined
  public static getInstance() {
    if (!Socket.instance) {
      Socket.instance = io(process.env.EXPO_PUBLIC_APOLO_API_URL as string, {
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
