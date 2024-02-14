"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateByIdUseCase = void 0;
const tslib_1 = require("tslib");
const lib_hera_1 = require("@olympus/lib-hera");
let UserUpdateByIdUseCase = class UserUpdateByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(props) {
        const news = await this.userRepository.updateById(props);
        if (news.isError)
            return news.lanchError();
        return news.value;
    }
};
exports.UserUpdateByIdUseCase = UserUpdateByIdUseCase;
exports.UserUpdateByIdUseCase = UserUpdateByIdUseCase = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ dep: ['USER_REPOSITORY'] }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserUpdateByIdUseCase);
