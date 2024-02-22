// socket.test.ts
import envVars from '@olympus/fe-rn-atena/src/utils/envVars'
import { Socket } from '@olympus/fe-rn-atena/src/utils/socket'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

describe('Socket', () => {
  let io: any
  let serverSocket: any
  let clientSocket: any

  beforeAll(async () => {
    const port = 3000
    const host = `http://localhost:${port}`
    vi.spyOn(envVars, 'baseURLApolo', 'get').mockReturnValue(host)

    const httpServer = createServer()
    io = new Server(httpServer)
    await new Promise((resolve) => {
      httpServer.listen(port, () => {
        clientSocket = Socket.getInstance()
        io.on('connection', (socket: any) => {
          serverSocket = socket
          resolve(true)
        })
        clientSocket.on('connect', resolve)
      })
    })
  })

  afterAll(() => {
    io.close()
    clientSocket.disconnect()
  })

  it('should be possible to receive response from an event', async () => {
    const instance = Socket.getInstance()

    const msg = 'any-msg'
    const response = await new Promise((resolve) => {
      instance.on('any-event', (msg: string) => {
        resolve(msg)
      })
      serverSocket.emit('any-event', msg)
    })

    expect(response).toBe(msg)
  })

  it('should disconnect and close the existing instance on unmount', () => {
    const instance = Socket.getInstance()
    const disconnect = vi.spyOn(instance, 'disconnect')
    const close = vi.spyOn(instance, 'close')
    Socket.unmount()
    expect(disconnect).toBeCalled()
    expect(close).toBeCalled()
  })
})
