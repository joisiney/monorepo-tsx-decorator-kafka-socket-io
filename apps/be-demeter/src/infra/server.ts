import { SendNewsKafkaController } from '@/application/controllers/send-news-kafka.controller'
import {
  IProducerService,
  KafkaProducerService,
} from '@olympus/kafka-persefone'
import { InjectorFactory } from '@olympus/lib-hera'
import 'reflect-metadata'

export namespace IProducer {
  export type Message = IProducerService.Message
  export type Implements = IProducerService.Implements
}

InjectorFactory.resolve(KafkaProducerService, {
  name: 'PRODUCER_NEWS',
  defaultArgs: {
    brokers: [process.env.BROKERS as string],
    ssl: true,
    sasl: {
      mechanism: process.env.MECHANISM as 'scram-sha-256',
      username: process.env.USERNAME as string,
      password: process.env.PASSWORD as string,
    },
  },
})
const kafkaController = InjectorFactory.resolve(SendNewsKafkaController)

kafkaController.execute()
