"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const tslib_1 = require("tslib");
const id_dto_1 = require("../../../application/dto/id.dto");
const index_use_case_1 = require("../../../application/use-cases/news/create/index.use-case");
const index_use_case_2 = require("../../../application/use-cases/news/find-all/index.use-case");
const index_use_case_3 = require("../../../application/use-cases/news/find-id/index.use-case");
const index_use_case_4 = require("../../../application/use-cases/news/remove/index.use-case");
const index_use_case_5 = require("../../../application/use-cases/news/update/index.use-case");
const lib_hera_1 = require("@olympus/lib-hera");
const all_dto_1 = require("./dto/all.dto");
const news_dto_1 = require("./dto/news.dto");
const put_dto_1 = require("./dto/put.dto");
let NewsController = class NewsController extends lib_hera_1.ControllerComposer {
    constructor(findAllUseCase, createUseCase, findByIdUseCase, updateByIdUseCase, removeByIdUseCase) {
        super();
        this.findAllUseCase = findAllUseCase;
        this.createUseCase = createUseCase;
        this.findByIdUseCase = findByIdUseCase;
        this.updateByIdUseCase = updateByIdUseCase;
        this.removeByIdUseCase = removeByIdUseCase;
    }
    async newsAll(input) {
        const response = await this.findAllUseCase.execute(input);
        return response;
    }
    async newsById(input) {
        return this.findByIdUseCase.execute(input);
    }
    async newsCreate(data) {
        return this.createUseCase.execute(data);
    }
    async newsUpdate(input) {
        return this.updateByIdUseCase.execute(input);
    }
    async newsDelete(input) {
        return this.removeByIdUseCase.execute(input);
    }
};
exports.NewsController = NewsController;
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'GET', url: '/', dto: all_dto_1.newsAllDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NewsController.prototype, "newsAll", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'GET', url: '/:id', dto: id_dto_1.newsKeyDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NewsController.prototype, "newsById", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'POST', url: '/', dto: news_dto_1.newsDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NewsController.prototype, "newsCreate", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'PUT', url: '/:id', dto: put_dto_1.newsUpdateDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NewsController.prototype, "newsUpdate", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'DELETE', url: '/:id', dto: id_dto_1.newsKeyDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NewsController.prototype, "newsDelete", null);
exports.NewsController = NewsController = tslib_1.__decorate([
    (0, lib_hera_1.Controller)('/olympus/news/'),
    (0, lib_hera_1.Injectable)({
        dep: [
            'NewsFindAllUseCase',
            'NewsCreateUseCase',
            'NewsFindByIdUseCase',
            'NewsUpdateByIdUseCase',
            'NewsRemoveByIdUseCase',
        ],
    }),
    tslib_1.__metadata("design:paramtypes", [index_use_case_2.NewsFindAllUseCase,
        index_use_case_1.NewsCreateUseCase,
        index_use_case_3.NewsFindByIdUseCase,
        index_use_case_5.NewsUpdateByIdUseCase,
        index_use_case_4.NewsRemoveByIdUseCase])
], NewsController);
