import { KafkaProducerService } from '@olympus/kafka-persefone'
import { InjectorFactory } from '@olympus/lib-hera'
import Fastify, { FastifyInstance } from 'fastify'
import 'reflect-metadata'
const port = +(process.env.PORT ?? 3001)

// BOOTSTRAP FASTIFY
const app: FastifyInstance = Fastify({ logger: false })

// INJECTING ROUTER
InjectorFactory.instance.set('PluginRouter', app)

const kafka = InjectorFactory.resolve(KafkaProducerService)
// // INJECTING ROUTER

// START SERVER
app.listen(
  {
    port,
  },
  async (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address} 🚀🚀`)
  },
)

//
// // kafka.boot({
// //   brokers: [process.env.BROKERS as string],
// //   ssl: true,
// //   sasl: {
// //     mechanism: process.env.MECHANISM as 'scram-sha-256',
// //     username: process.env.USERNAME as string,
// //     password: process.env.PASSWORD as string
// //   }
// // })

// // const run = async () => {
// //   const {producer, disconnect} = await kafka.transaction();
// //   await producer.send({
// //     topic: 'news.send-news',
// //     messages: [
// //       {
// //         key: crypto.randomUUID(),
// //         value: JSON.stringify({
// //           title: `Title 1p`,
// //           description: `Description 1p`,
// //           content: `Content 1p`,
// //           thumbnail: `https://api.lorem.space/image/face?w=100&h=100&data=1`
// //         })
// //       },
// //     ],
// //   });
// //   await disconnect()
// // };

// // run().catch(e => console.error('[example/producer] e.message', e)).finally(() => {
// //   console.log('Mensagem disparada com sucesso! 🚀')
// //   process.exit(0)
// // });
