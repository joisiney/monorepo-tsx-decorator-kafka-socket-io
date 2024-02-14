"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_controller_1 = require("../application/controllers/news/index.controller");
const index_controller_2 = require("../application/controllers/users/index.controller");
const index_use_case_1 = require("../application/use-cases/news/create/index.use-case");
const index_use_case_2 = require("../application/use-cases/news/find-all/index.use-case");
const index_use_case_3 = require("../application/use-cases/news/find-id/index.use-case");
const index_use_case_4 = require("../application/use-cases/news/remove/index.use-case");
const index_use_case_5 = require("../application/use-cases/news/update/index.use-case");
const index_use_case_6 = require("../application/use-cases/users/create/index.use-case");
const index_use_case_7 = require("../application/use-cases/users/find-all/index.use-case");
const index_use_case_8 = require("../application/use-cases/users/find-id/index.use-case");
const index_use_case_9 = require("../application/use-cases/users/remove/index.use-case");
const index_use_case_10 = require("../application/use-cases/users/update/index.use-case");
const lib_hera_1 = require("@olympus/lib-hera");
const fastify_1 = tslib_1.__importDefault(require("fastify"));
require("reflect-metadata");
const data_source_1 = require("./database/typeorm/data-source");
const mock_repository_1 = require("./repositories/news/mock.repository");
const typeorm_repository_1 = require("./repositories/user/typeorm.repository");
const port = +(process.env.PORT ?? 3001);
// BOOTSTRAP FASTIFY
const app = (0, fastify_1.default)({ logger: false });
// INJECTING ROUTER
lib_hera_1.InjectorFactory.instance.set('PluginRouter', app);
// INJECTING NEWS MODULE
{
    {
        // USE_CASE NEWS
        lib_hera_1.InjectorFactory.resolve(index_use_case_2.NewsFindAllUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_1.NewsCreateUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_3.NewsFindByIdUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_5.NewsUpdateByIdUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_4.NewsRemoveByIdUseCase);
        // USE_CASE USER
        lib_hera_1.InjectorFactory.resolve(index_use_case_6.UserCreateUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_8.UserFindByIdUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_7.UserFindAllUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_9.UserRemoveByIdUseCase);
        lib_hera_1.InjectorFactory.resolve(index_use_case_10.UserUpdateByIdUseCase);
    }
    {
        // INJECTING NEWS REPOSITORY
        lib_hera_1.InjectorFactory.resolve(mock_repository_1.NewsRepositoryMock);
        lib_hera_1.InjectorFactory.resolve(typeorm_repository_1.UserRepositoryTypeORM);
    }
    // INJECTING NEWS CONTROLLER
    lib_hera_1.InjectorFactory.resolve(index_controller_1.NewsController);
    lib_hera_1.InjectorFactory.resolve(index_controller_2.UserController);
}
// ERROR HANDLER
app.setErrorHandler(function (error, request, reply) {
    console.log('app/setErrorHandler()', error);
    return reply.send(error);
});
// START SERVER
app.listen({
    port,
}, async (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    try {
        await data_source_1.dataSource.initialize();
        console.log('data base running');
        await data_source_1.dataSource.runMigrations();
        console.log('migrations finished');
    }
    catch (err) {
        console.error(err);
    }
    finally {
        console.log(`Server listening at ${address} 🚀🚀`);
    }
});
