"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const index_use_case_1 = require("../../../application/use-cases/users/create/index.use-case");
const index_dto_1 = require("../../../application/use-cases/users/find-all/index.dto");
const index_use_case_2 = require("../../../application/use-cases/users/find-all/index.use-case");
const index_use_case_3 = require("../../../application/use-cases/users/find-id/index.use-case");
const index_use_case_4 = require("../../../application/use-cases/users/remove/index.use-case");
const index_use_case_5 = require("../../../application/use-cases/users/update/index.use-case");
const lib_hera_1 = require("@olympus/lib-hera");
const create_dto_1 = require("./dto/create.dto");
const id_dto_1 = require("./dto/id.dto");
const put_dto_1 = require("./dto/put.dto");
let UserController = class UserController extends lib_hera_1.ControllerComposer {
    constructor(createUseCase, findByIdUseCase, findAllUseCase, removeByIdUseCase, updateByIdUseCase) {
        super();
        this.createUseCase = createUseCase;
        this.findByIdUseCase = findByIdUseCase;
        this.findAllUseCase = findAllUseCase;
        this.removeByIdUseCase = removeByIdUseCase;
        this.updateByIdUseCase = updateByIdUseCase;
    }
    async save(data) {
        return this.createUseCase.execute(data);
    }
    async findById({ id }) {
        return this.findByIdUseCase.execute(id);
    }
    async findAll(props) {
        return this.findAllUseCase.execute(props);
    }
    async removeById({ id }) {
        return this.removeByIdUseCase.execute(id);
    }
    async updateById(props) {
        return this.updateByIdUseCase.execute(props);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'POST', url: '/user', dto: create_dto_1.userCreateDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "save", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'GET', url: '/user/:id', dto: id_dto_1.userIdDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'GET', url: '/user', dto: index_dto_1.userAllDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'DELETE', url: '/user/:id', dto: id_dto_1.userIdDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "removeById", null);
tslib_1.__decorate([
    (0, lib_hera_1.Route)({ method: 'PUT', url: '/user/:id', dto: put_dto_1.userUpdateDto }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, lib_hera_1.Controller)('/olympus'),
    (0, lib_hera_1.Injectable)({
        dep: [
            'UserCreateUseCase',
            'UserFindByIdUseCase',
            'UserFindAllUseCase',
            'UserRemoveByIdUseCase',
            'UserUpdateByIdUseCase',
        ],
    }),
    tslib_1.__metadata("design:paramtypes", [index_use_case_1.UserCreateUseCase,
        index_use_case_3.UserFindByIdUseCase,
        index_use_case_2.UserFindAllUseCase,
        index_use_case_4.UserRemoveByIdUseCase,
        index_use_case_5.UserUpdateByIdUseCase])
], UserController);
