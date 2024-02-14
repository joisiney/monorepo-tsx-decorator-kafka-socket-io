"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPasswordColumnUserTable1707261901674 = void 0;
class AddPasswordColumnUserTable1707261901674 {
    constructor() {
        this.name = 'AddPasswordColumnUserTable1707261901674';
    }
    async up(queryRunner) {
        await queryRunner.query('DROP INDEX `UQ_cace4a159ff9f2512dd42373760` ON `user`');
        await queryRunner.query('DROP INDEX `UQ_e12875dfb3b1d92d7d7c5377e22` ON `user`');
        await queryRunner.query('ALTER TABLE `user` ADD `password` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `user` CHANGE `name` `name` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `user` CHANGE `email` `email` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `user` ADD UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `user` DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`');
        await queryRunner.query('ALTER TABLE `user` CHANGE `email` `email` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `user` CHANGE `name` `name` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `password`');
        await queryRunner.query('CREATE UNIQUE INDEX `UQ_e12875dfb3b1d92d7d7c5377e22` ON `user` (`email`)');
        await queryRunner.query('CREATE UNIQUE INDEX `UQ_cace4a159ff9f2512dd42373760` ON `user` (`id`)');
    }
}
exports.AddPasswordColumnUserTable1707261901674 = AddPasswordColumnUserTable1707261901674;
