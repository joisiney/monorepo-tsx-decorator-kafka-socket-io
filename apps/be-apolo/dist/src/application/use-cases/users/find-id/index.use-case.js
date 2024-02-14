"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFindByIdUseCase = void 0;
const tslib_1 = require("tslib");
const lib_hera_1 = require("@olympus/lib-hera");
let UserFindByIdUseCase = class UserFindByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (user.isError)
            return user.lanchError();
        return user.value;
    }
};
exports.UserFindByIdUseCase = UserFindByIdUseCase;
exports.UserFindByIdUseCase = UserFindByIdUseCase = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ dep: ['USER_REPOSITORY'] }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserFindByIdUseCase);
