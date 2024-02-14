"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFindAllUseCase = void 0;
const tslib_1 = require("tslib");
const lib_hera_1 = require("@olympus/lib-hera");
let UserFindAllUseCase = class UserFindAllUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(props) {
        const user = await this.userRepository.findAll(props);
        if (user.isError)
            return user.lanchError();
        return user.value;
    }
};
exports.UserFindAllUseCase = UserFindAllUseCase;
exports.UserFindAllUseCase = UserFindAllUseCase = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ dep: ['USER_REPOSITORY'] }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserFindAllUseCase);
