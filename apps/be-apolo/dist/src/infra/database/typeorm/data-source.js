"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const path_1 = require("path");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const entity = (0, path_1.join)(__dirname, '..', 'entities', '*.entity.ts');
const migration = (0, path_1.join)(__dirname, '..', 'migrations', '*.ts');
const options = {
    type: 'mysql',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: +(process.env.DATABASE_PORT ?? 3306),
    username: process.env.DATABASE_USERNAME ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? 'root',
    database: process.env.DATABASE_DATABASE ?? 'teste-db',
    entities: [entity],
    migrations: [migration],
    synchronize: false,
};
exports.dataSource = new typeorm_1.DataSource({
    ...options,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
