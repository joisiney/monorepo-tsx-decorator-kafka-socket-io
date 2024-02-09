import { NewsController } from '@/application/controllers/news/index.controller'
import { NewsCreateUseCase } from '@/application/use-cases/news/create/index.use-case'
import { NewsFindAllUseCase } from '@/application/use-cases/news/find-all/index.use-case'
import { NewsFindByIdUseCase } from '@/application/use-cases/news/find-id/index.use-case'
import { NewsRemoveByIdUseCase } from '@/application/use-cases/news/remove/index.use-case'
import { NewsUpdateByIdUseCase } from '@/application/use-cases/news/update/index.use-case'
import { InjectorFactory } from '@olympus/lib-hera'
import Fastify, { FastifyInstance } from 'fastify'
import 'reflect-metadata'
import { NewsMockRepository } from './repositories/news/mock.repository'

// BOOTSTRAP FASTIFY
const app: FastifyInstance = Fastify({ logger: false })

// INJECTING ROUTER 
InjectorFactory.instance.set('PluginRouter', app)

// INJECTING NEWS MODULE
{
  {
    // INJECTING NEWS USE CASES
    InjectorFactory.resolve(NewsFindAllUseCase)
    InjectorFactory.resolve(NewsCreateUseCase)
    InjectorFactory.resolve(NewsFindByIdUseCase)
    InjectorFactory.resolve(NewsUpdateByIdUseCase)
    InjectorFactory.resolve(NewsRemoveByIdUseCase)
  }
  {
    // INJECTING NEWS REPOSITORY
    InjectorFactory.resolve(NewsMockRepository)
  }
  InjectorFactory.resolve(NewsController)
}

// ERROR HANDLER
app.setErrorHandler(function (error, request, reply) {
  console.log('app/setErrorHandler()', error)
  return reply.send(error)
})

// START SERVER
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
