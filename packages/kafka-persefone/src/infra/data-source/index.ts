import { Kafka, logLevel } from 'kafkajs'
import { KafkaDataSourceProps } from './index.d'
export class KafkaDataSourceComposer {
  protected kafka!: Kafka
  constructor(credentials: KafkaDataSourceProps) {
    this.kafka = new Kafka({
      ...credentials,
      logLevel: logLevel.ERROR,
    })
  }
  protected checkIfBooted() {
    if (!this.kafka) throw new Error('KafkaProducerService is not booted')
  }
}
