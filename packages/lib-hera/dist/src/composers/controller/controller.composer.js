"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerComposer = void 0;
require("reflect-metadata");
const transform_exception_service_1 = require("../../application/services/transform-exception.service");
const injection_1 = require("../../decorators/injection");
const index_entity_1 = require("../../domain/entities/pagination/index.entity");
const controller_params_1 = require("./controller.params");
const controller_parser_1 = require("./controller.parser");
class ControllerComposer {
    constructor() {
        if (!injection_1.InjectorFactory.instance.has('PluginRouter')) {
            throw new Error('It is necessary to inject the pluginrater into the dependency container');
        }
        const app = injection_1.InjectorFactory.instance.get('PluginRouter');
        const path = (Reflect.getMetadata('path', this.constructor) ??
            []);
        const routes = Reflect.getMetadata('routes', this.constructor) ?? [];
        const logger = [];
        for (const { method, propertyKey, url: rawUrl, dto } of routes) {
            let url = '/';
            url += [...path, ...rawUrl.split('/').filter(Boolean)].join('/');
            logger.push({
                CONTROLLER: this.constructor.name,
                METHOD: method,
                LINK: url,
            });
            app.route({
                method,
                url,
                handler: async (request, reply) => {
                    try {
                        const parent = this;
                        if (propertyKey in this) {
                            const paramsService = new controller_params_1.ControllerParams(request);
                            const parsedService = new controller_parser_1.ControllerParamsParser(paramsService);
                            const parseded = parsedService.parseTo(dto);
                            const handler = parent[propertyKey].bind(parent);
                            const result = parseded
                                ? await handler(parseded)
                                : await handler();
                            let response = {
                                code: 200,
                                status: 'success',
                                data: typeof result === 'boolean' ? result : undefined,
                            };
                            if (response.data === undefined && 'toJSON' in result) {
                                if (result instanceof index_entity_1.PaginationEntity) {
                                    response = {
                                        ...response,
                                        ...result.toJSON()
                                    };
                                }
                                else {
                                    response = {
                                        ...response,
                                        data: result
                                    };
                                }
                            }
                            reply
                                .status(response.code)
                                .header('Content-Type', 'application/json; charset=utf-8')
                                .send(JSON.stringify(response));
                        }
                        throw new Error('Method not found');
                    }
                    catch (error) {
                        const errorService = new transform_exception_service_1.TransformExceptionService(this.constructor.name, url, method, error);
                        const errorResponse = errorService.execute();
                        reply.status(errorResponse.code).send(errorResponse);
                    }
                },
            });
        }
        console.table(logger);
    }
}
exports.ControllerComposer = ControllerComposer;
