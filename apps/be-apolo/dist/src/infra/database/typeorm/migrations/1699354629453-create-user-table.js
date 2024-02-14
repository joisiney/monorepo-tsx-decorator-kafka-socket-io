"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1699354629453 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1699354629453 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isUnique: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'birthdate',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.CreateUserTable1699354629453 = CreateUserTable1699354629453;
