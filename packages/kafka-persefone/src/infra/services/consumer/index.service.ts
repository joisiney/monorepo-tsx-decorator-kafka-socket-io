import { ISubscription } from '../../../decorators'
import { IKafkaDataSource } from '../../data-source/index.dto'

export class KafkaConsumerService {
  triggers: { [key: string]: { [key: string]: any } } = {}
  constructor(
    private dataSource: IKafkaDataSource.Implements,
    ...consumers: any[]
  ) {
    consumers.forEach((target) => {
      const subscriptions =
        Reflect.getMetadata('subscription', target.constructor) ?? []

      subscriptions.forEach(({ topic, propertyKey }: ISubscription) => {
        this.triggers[topic] = this.triggers[topic] ?? {}
        this.triggers[topic][propertyKey] = target
      })
    })

    void this.startBatchConsumer()
  }
  public async startBatchConsumer(): Promise<void> {
    try {
      const consumer = this.dataSource.consumer
      await consumer.connect()
      const topics = Object.keys(this.triggers)
      await consumer.subscribe({
        topics,
        fromBeginning: false,
      })

      await consumer.run({
        eachMessage: async ({ topic, message }) => {
          try {
            if (!message.value) {
              console.error(
                `[KafkaConsumerService/consumer] Message without value: ${message}`,
              )
              return
            }
            const sMessage = message.value.toString()
            const jsonMessage = JSON.parse(sMessage)
            const propertyKeys = this.triggers[topic]
            for (const propertyKey in propertyKeys) {
              const target = propertyKeys[propertyKey]
              target[propertyKey](jsonMessage)
            }
          } catch (e) {
            console.error(
              `[KafkaConsumerService/consumer] ${(e as any).message}`,
              e,
            )
          }
        },
      })
    } catch (e) {
      console.error(`[KafkaConsumerService/consumer] ${(e as any).message}`, e)
    }
  }
}
