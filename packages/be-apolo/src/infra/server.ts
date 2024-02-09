import { NewsController } from '@/application/controllers/news/index.controller'

import { NewsFindAllUseCase } from '@/application/use-cases/news/find-all/index.use-case'
import { InjectorFactory } from '@olympus/lib-hera'
import Fastify, { FastifyInstance } from 'fastify'
import 'reflect-metadata'
import { NewsMockRepository } from './repositories/news/mock.repository'

const app: FastifyInstance = Fastify({ logger: false })

InjectorFactory.instance.set('PluginRouter', app)

app.setErrorHandler(function (error, request, reply) {
  console.log('app/setErrorHandler()')
  return reply.send(error)
})

InjectorFactory.resolve(NewsFindAllUseCase)
InjectorFactory.resolve(NewsMockRepository)
InjectorFactory.resolve(NewsController)

app.listen(
  {
    port: 3001,
  },
  (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address} 🚀🚀`)
  },
)
