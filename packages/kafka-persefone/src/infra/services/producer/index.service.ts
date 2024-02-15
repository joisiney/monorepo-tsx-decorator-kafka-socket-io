import { IKafkaDataSource } from '../../data-source/index.dto'
import { IProducerService } from './index.dto'

export class KafkaProducerService implements IProducerService.Implements {
  constructor(private dataSource: IKafkaDataSource.Implements) {}
  async send(props: IProducerService.SendProps): Promise<boolean> {
    const messages = props.messages.map((message) => {
      return {
        key: message.key,
        value: JSON.stringify(message.value),
      }
    })

    const producer = this.dataSource.producer
    await producer.connect()
    await producer.send({
      topic: props.topic,
      messages,
    })
    await producer.disconnect()
    return true
  }
  async transaction(): Promise<IProducerService.TransactionResponse> {
    const producer = this.dataSource.producer
    await this.dataSource.producer.connect()
    return {
      producer,
      disconnect: async () => {
        await producer.disconnect()
        return true
      },
    }
  }
}
