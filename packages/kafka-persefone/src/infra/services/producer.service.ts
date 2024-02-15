import { Injectable } from '@olympus/lib-hera'
import { KafkaDataSourceComposer } from '../database/data-source'

@Injectable({ name: 'MESSAGING_PRODUCER' })
export class KafkaProducerService extends KafkaDataSourceComposer {
  constructor() {
    super()
  }

  async send(topic: string, messages: { value: string; key: string }[]) {
    this.checkIfBooted()
    const producer = this.kafka.producer()
    await producer.connect()
    await producer.send({
      topic,
      messages,
    })
    await producer.disconnect()
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
