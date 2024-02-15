import { Consumer, Producer } from 'kafkajs'

export namespace IKafkaDataSource {
  export interface Props {
    groupId: string
    brokers: string[]
    ssl: boolean
    sasl: {
      mechanism: 'scram-sha-256'
      username: string
      password: string
    }
  }
  export interface Implements {
    producer: Producer
    consumer: Consumer
  }
}
