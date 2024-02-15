import { IProducer } from '@/infra/server'
import { Injectable } from '@olympus/lib-hera'

@Injectable({
  dep: ['PRODUCER_NEWS'],
})
export class SendNewsKafkaController {
  constructor(private producer: IProducer.Implements) {}

  async execute() {
    await this.producer.send('news.send-news', [
      {
        key: crypto.randomUUID(),
        value: JSON.stringify({
          title: `Title 1p`,
          description: `Description 1p`,
          content: `Content 1p`,
          thumbnail: `https://api.lorem.space/image/face?w=100&h=100&data=1`,
        }),
      },
    ])
  }
}
