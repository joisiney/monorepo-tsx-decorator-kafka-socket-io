import { Injectable } from '@olympus/be-di-ilitia'
import { IProducer } from '../dto/index.dto'

@Injectable({
  dep: ['PRODUCER_NEWS'],
})
export class ProducerNewsKafkaUseCase {
  constructor(private producer: IProducer.Implements) {}

  async execute(counter: number) {
    const key = crypto.randomUUID()
    this.producer.send({
      topic: 'news.send-news',
      messages: [
        {
          key,
          value: {
            title: `Title ${counter}p`,
            description: `Description ${counter}p`,
            content: `Content ${counter}p`,
            thumbnail: `https://api.lorem.space/image/face?w=100&h=100&data=${counter}`,
          },
        },
      ],
    })
  }
}
