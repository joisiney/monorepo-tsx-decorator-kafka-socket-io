"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryTypeORM = void 0;
const tslib_1 = require("tslib");
const data_source_1 = require("../../../infra/database/typeorm/data-source");
const user_entity_1 = require("../../../infra/database/typeorm/entities/user.entity");
const domain_ceos_1 = require("@olympus/domain-ceos");
const lib_hera_1 = require("@olympus/lib-hera");
let UserRepositoryTypeORM = class UserRepositoryTypeORM {
    constructor() {
        this.user = data_source_1.dataSource.getRepository(user_entity_1.UserTypeORM);
    }
    async findAll(props) {
        const paginationService = new lib_hera_1.PaginationEntity({
            page: props.page,
            take: props.take,
        });
        const [users, total] = await this.user.findAndCount(paginationService.pointer);
        if (!users?.length) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('Users not found'));
        }
        paginationService.data = users.map((user) => new domain_ceos_1.UserEntity(user));
        paginationService.total = total;
        return new lib_hera_1.Right(paginationService);
    }
    async findById(id) {
        const user = await this.user.findOne({ where: { id } });
        if (!user) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('User not found'));
        }
        const userMapper = new domain_ceos_1.UserEntity(user);
        return new lib_hera_1.Right(userMapper);
    }
    async findByEmail(email) {
        const user = await this.user.findOne({ where: { email } });
        if (!user) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('User not found'));
        }
        const userMapper = new domain_ceos_1.UserEntity(user);
        return new lib_hera_1.Right(userMapper);
    }
    async create(props) {
        const hasUser = await this.findByEmail(props.email);
        if (hasUser.isSuccess) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('User already exists '));
        }
        const userDto = new user_entity_1.UserTypeORM();
        userDto.name = props.name;
        userDto.email = props.email;
        userDto.password = props.password;
        userDto.address = props.address;
        userDto.birthdate = props.birthdate;
        userDto.createdAt = new Date();
        const user = this.user.save(userDto);
        if (!user) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('User not created'));
        }
        return new lib_hera_1.Right(true);
    }
    async updateById({ id, ...props }) {
        const user = await this.user.findOne({ where: { id } });
        if (!user) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('User not found'));
        }
        const userUpdated = await this.user.update({ id }, props);
        const userMapper = new domain_ceos_1.UserEntity({ ...user, ...props });
        return new lib_hera_1.Right(userMapper);
    }
    async deleteById(id) {
        const user = await this.user.findOne({ where: { id } });
        if (!user) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('User not found'));
        }
        await this.user.delete({ id });
        return new lib_hera_1.Right(true);
    }
};
exports.UserRepositoryTypeORM = UserRepositoryTypeORM;
exports.UserRepositoryTypeORM = UserRepositoryTypeORM = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ name: 'USER_REPOSITORY' })
], UserRepositoryTypeORM);
