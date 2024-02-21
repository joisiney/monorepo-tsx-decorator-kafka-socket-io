import { ProducerNewsKafkaUseCase } from '@/application/use-cases/producer.use-case'
import { KafkaDataSource, KafkaProducerService } from '@olympus/kafka-persefone'
import { InjectorFactory } from '@olympus/lib-hera'
import 'reflect-metadata'

InjectorFactory.resolve(KafkaDataSource, {
  name: 'DATA_SOURCE_MESSAGES',
  defaultArgs: {
    groupId: 'news-group',
    brokers: [process.env.BROKERS as string],
    ssl: true,
    sasl: {
      mechanism: process.env.MECHANISM as 'scram-sha-256',
      username: process.env.USERNAME as string,
      password: process.env.PASSWORD as string,
    },
  },
})

InjectorFactory.resolve(KafkaProducerService, {
  name: 'PRODUCER_NEWS',
  dep: ['DATA_SOURCE_MESSAGES'],
})

const kafkaProducerController = InjectorFactory.resolve(
  ProducerNewsKafkaUseCase,
)
let counter = 0
const maxMessages = 4
const intervalSeconds = 1000 * 10 // 10 seconds
const dispatchMessage = async () => {
  console.info(`Dispatching message ${counter}`)
  await kafkaProducerController.execute(counter + 1000)
  if (counter < maxMessages) {
    setTimeout(dispatchMessage, intervalSeconds)
    counter++
  } else {
    console.info(`Max messages reached ${counter}`)
    process.exit(0)
  }
}
setTimeout(dispatchMessage, intervalSeconds)
