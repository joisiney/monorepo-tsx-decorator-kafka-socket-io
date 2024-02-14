import { KafkaProducerService } from '@olympus/kafka-persefone'
import { InjectorFactory } from '@olympus/lib-hera'
import 'reflect-metadata'

const kafka = InjectorFactory.resolve(KafkaProducerService)
console.log('kafka', kafka)
// // INJECTING ROUTER

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
