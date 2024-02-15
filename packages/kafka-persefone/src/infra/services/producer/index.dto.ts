export namespace IProducerService {
  export interface Message {
    value: string
    key: string
  }
  export interface Implements {
    send(topic: string, messages: Message[]): Promise<void>
    transaction(): Promise<{ producer: any; disconnect: () => Promise<void> }>
  }
}
