import { Consumer, Kafka, Producer, logLevel } from 'kafkajs'
import { IKafkaDataSource } from './index.dto'
export class KafkaDataSource implements IKafkaDataSource.Implements {
  private kafka!: Kafka
  private _producer!: Producer
  private _consumer!: Consumer
  private _groupId: string
  constructor({ groupId, ...credentials }: IKafkaDataSource.Props) {
    this._groupId = groupId
    this.kafka = new Kafka({
      ...credentials,
      logLevel: logLevel.ERROR,
    })
  }

  get producer() {
    this._producer = this._producer || this.kafka.producer()
    return this._producer
  }
  get consumer() {
    this._consumer =
      this._consumer || this.kafka.consumer({ groupId: this._groupId })
    return this._consumer
  }
}
