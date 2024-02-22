import { NewsController } from '@/application/controllers/news/index.controller'
import { UserController } from '@/application/controllers/users/index.controller'
import { NewsCreateUseCase } from '@/application/use-cases/news/create/index.use-case'
import { NewsFindAllUseCase } from '@/application/use-cases/news/find-all/index.use-case'
import { NewsFindByIdUseCase } from '@/application/use-cases/news/find-id/index.use-case'
import { NewsRemoveByIdUseCase } from '@/application/use-cases/news/remove/index.use-case'
import { NewsUpdateByIdUseCase } from '@/application/use-cases/news/update/index.use-case'
import { UserCreateUseCase } from '@/application/use-cases/users/create/index.use-case'
import { UserFindAllUseCase } from '@/application/use-cases/users/find-all/index.use-case'
import { UserFindByIdUseCase } from '@/application/use-cases/users/find-id/index.use-case'
import { UserRemoveByIdUseCase } from '@/application/use-cases/users/remove/index.use-case'
import { UserUpdateByIdUseCase } from '@/application/use-cases/users/update/index.use-case'
import {
  AddingRouteInScripter,
  FastifyAdapter,
  fastifyReqGatherDataPipe,
  fastifyReqParseErrorPipe,
  fastifyReqParseUserAgentPipe,
  fastifyReqParseZodPipe,
  fastifyResTransformPipe,
  fastifyResTriggerControllerPipe,
  routesInfo,
} from '@olympus/be-router-angelo'
import { IOServerService } from '@olympus/io-server-pluto'
import { KafkaConsumerService, KafkaDataSource } from '@olympus/kafka-persefone'
import { InjectorFactory } from '@olympus/lib-hera'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import 'reflect-metadata'
import { dataSource } from './database/typeorm/data-source'
import { NewsRepositoryMock } from './repositories/news/mock.repository'
import { UserRepositoryTypeORM } from './repositories/user/typeorm.repository'

const port = +(process.env.PORT ?? 3001)

// BOOTSTRAP FASTIFY
const app: FastifyInstance = Fastify({
  logger: false,
})

// INJECTING ROUTER
const routerAdapter = new FastifyAdapter<
  FastifyInstance,
  FastifyRequest,
  FastifyReply
>(app)
routerAdapter.reqPipeline.add(
  fastifyReqGatherDataPipe,
  fastifyReqParseUserAgentPipe,
  fastifyReqParseZodPipe,
)

routerAdapter.resPipeline.add(
  fastifyResTriggerControllerPipe,
  fastifyResTransformPipe,
)
routerAdapter.errorPipeline.add(fastifyReqParseErrorPipe)
AddingRouteInScripter.getInstance(routerAdapter)

// INJECTING NEWS MODULE
{
  {
    // SOCKET.IO Deve vir sempre antes da injeção dos use-cases que o consumirem.
    InjectorFactory.resolve(IOServerService, {
      name: 'IO_SERVER',
      defaultArgs: {
        channels: ['news-delete', 'news-update', 'news-create'],
        server: app.server,
        options: {
          cors: {
            origin: '*',
          },
        },
      },
    })
  }
  {
    // USE_CASE NEWS
    InjectorFactory.resolve(NewsFindAllUseCase)
    InjectorFactory.resolve(NewsCreateUseCase)
    InjectorFactory.resolve(NewsFindByIdUseCase)
    InjectorFactory.resolve(NewsUpdateByIdUseCase)
    InjectorFactory.resolve(NewsRemoveByIdUseCase)

    // USE_CASE USER
    InjectorFactory.resolve(UserCreateUseCase)
    InjectorFactory.resolve(UserFindByIdUseCase)
    InjectorFactory.resolve(UserFindAllUseCase)
    InjectorFactory.resolve(UserRemoveByIdUseCase)
    InjectorFactory.resolve(UserUpdateByIdUseCase)
  }
  {
    // INJECTING NEWS REPOSITORY
    InjectorFactory.resolve(NewsRepositoryMock)
    InjectorFactory.resolve(UserRepositoryTypeORM)
  }
  {
    // INJECTING NEWS CONTROLLER
    InjectorFactory.resolve(NewsController)
    InjectorFactory.resolve(UserController)
  }
  // INJECTING DATA SOURCE KAFKA
  {
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
    // A instancia do KafkaProducerService deve ser sempre a última a ser instanciada
    InjectorFactory.resolve(KafkaConsumerService, {
      name: 'CONSUMER_NEWS',
      dep: ['DATA_SOURCE_MESSAGES', 'NewsCreateUseCase'],
    })
  }
}

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
    try {
      await dataSource.initialize()
      await dataSource.runMigrations()
    } catch (err) {
      console.error(err)
    } finally {
      console.table(routesInfo())
      console.info(`Server listening at ${address} 🚀🚀`)
    }
  },
)
