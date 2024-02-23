import { NewsController, UserController } from '@/application/controllers'
import {
  NewsCreateUseCase,
  NewsFindAllUseCase,
  NewsFindByIdUseCase,
  NewsRemoveByIdUseCase,
  NewsUpdateByIdUseCase,
  UserCreateUseCase,
  UserFindAllUseCase,
  UserFindByIdUseCase,
  UserRemoveByIdUseCase,
  UserUpdateByIdUseCase,
} from '@/application/use-cases'
import { InjectorFactory } from '@olympus/be-di-ilitia'
import {
  AddingRouteInScripterSingleton,
  FastifyAdapter,
  fastifyReqGatherDataPipe,
  fastifyReqParseUserAgentPipe,
  fastifyReqParseZodPipe,
  fastifyResGatherErrorPipe,
  fastifyResIsMyExceptionPipe,
  fastifyResPresentationErrorPipe,
  fastifyResTransformPipe,
  fastifyResTriggerControllerPipe,
  routesInfo,
} from '@olympus/be-router-angelo'
import { IOServerService } from '@olympus/io-server-pluto'
import { KafkaConsumerService, KafkaDataSource } from '@olympus/kafka-persefone'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import 'reflect-metadata'
import { dataSource } from './database/typeorm/data-source'
import { NewsRepositoryMock, UserRepositoryTypeORM } from './repositories'

const port = +(process.env.PORT ?? 3001)

// BOOTSTRAP FASTIFY
const app: FastifyInstance = Fastify({
  logger: false,
})
app.addHook(
  'preHandler',
  (req: FastifyRequest, reply: FastifyReply, done: any) => {
    reply.header('Content-Type', 'application/json; charset=utf-8')
    done()
  },
)
// INJECTING ROUTER
const fastifyRouterAdapter = new FastifyAdapter<
  FastifyInstance,
  FastifyRequest,
  FastifyReply
>(app)
fastifyRouterAdapter.reqPipeline.add(
  fastifyReqGatherDataPipe,
  fastifyReqParseUserAgentPipe,
  fastifyReqParseZodPipe,
)

fastifyRouterAdapter.resPipeline.add(
  fastifyResTriggerControllerPipe,
  fastifyResTransformPipe,
)
fastifyRouterAdapter.errorPipeline.add(
  fastifyResGatherErrorPipe,
  fastifyResIsMyExceptionPipe,
  fastifyResPresentationErrorPipe,
)
AddingRouteInScripterSingleton.getInstance(fastifyRouterAdapter)

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
