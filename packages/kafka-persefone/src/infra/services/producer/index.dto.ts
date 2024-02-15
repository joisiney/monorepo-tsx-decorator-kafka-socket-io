export namespace IProducerService {
  export interface Message {
    value: { [key: string]: string }
    key: string
  }
  export interface SendProps {
    topic: string
    messages: Message[]
  }
  export interface TransactionResponse {
    producer: any
    disconnect: () => Promise<boolean>
  }
  export interface Implements {
    send(props: SendProps): Promise<boolean>
    transaction(): Promise<TransactionResponse>
  }
}
