import { KafkaDataSourceComposer } from '../../data-source'
import { IProducerService } from './index.dto'

export class KafkaProducerService
  extends KafkaDataSourceComposer
  implements IProducerService.Implements
{
  async send(topic: string, messages: IProducerService.Message[]) {
    this.checkIfBooted()
    const producer = this.kafka.producer()
    console.log('Connectting to Kafka')
    await producer.connect()
    await producer.send({
      topic,
      messages,
    })
    console.log('Message sent to Kafka')
    await producer.disconnect()
    console.log('Disconnected from Kafka')
  }

  async transaction() {
    this.checkIfBooted()
    const producer = this.kafka.producer()
    await producer.connect()
    return {
      producer,
      disconnect: async () => {
        await producer.disconnect()
      },
    }
  }
}
