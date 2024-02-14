"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeORM = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
let UserTypeORM = class UserTypeORM {
    async before() {
        if (!this.password)
            throw new Error('Password not found');
        const salt = await bcrypt_1.default.genSalt();
        this.password = await bcrypt_1.default.hash(this.password, salt);
        if (!this.createdAt)
            this.createdAt = new Date();
    }
    comparePassword(password) {
        if (!this.password)
            return false;
        try {
            return bcrypt_1.default.compare(password, this.password);
        }
        catch {
            return false;
        }
    }
};
exports.UserTypeORM = UserTypeORM;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserTypeORM.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], UserTypeORM.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    tslib_1.__metadata("design:type", String)
], UserTypeORM.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserTypeORM.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], UserTypeORM.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], UserTypeORM.prototype, "birthdate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    tslib_1.__metadata("design:type", Date)
], UserTypeORM.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserTypeORM.prototype, "before", null);
exports.UserTypeORM = UserTypeORM = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user')
], UserTypeORM);
