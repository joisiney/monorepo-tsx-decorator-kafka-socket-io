import { IProducerService } from '@olympus/kafka-persefone'

export namespace IProducer {
  export type Message = IProducerService.Message
  export type Implements = IProducerService.Implements
}
