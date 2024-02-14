"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRemoveByIdUseCase = void 0;
const tslib_1 = require("tslib");
const lib_hera_1 = require("@olympus/lib-hera");
let UserRemoveByIdUseCase = class UserRemoveByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const news = await this.userRepository.deleteById(id);
        if (news.isError)
            return news.lanchError();
        return news.value;
    }
};
exports.UserRemoveByIdUseCase = UserRemoveByIdUseCase;
exports.UserRemoveByIdUseCase = UserRemoveByIdUseCase = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ dep: ['USER_REPOSITORY'] }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserRemoveByIdUseCase);
