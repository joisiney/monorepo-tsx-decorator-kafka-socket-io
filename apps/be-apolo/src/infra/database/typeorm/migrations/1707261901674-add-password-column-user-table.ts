import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColumnUserTable1707261901674 implements MigrationInterface {
    name = 'AddPasswordColumnUserTable1707261901674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX `UQ_cace4a159ff9f2512dd42373760` ON `user`');
        await queryRunner.query('DROP INDEX `UQ_e12875dfb3b1d92d7d7c5377e22` ON `user`');
        await queryRunner.query('ALTER TABLE `user` ADD `password` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `user` CHANGE `name` `name` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `user` CHANGE `email` `email` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `user` ADD UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `user` DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`');
        await queryRunner.query('ALTER TABLE `user` CHANGE `email` `email` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `user` CHANGE `name` `name` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `password`');
        await queryRunner.query('CREATE UNIQUE INDEX `UQ_e12875dfb3b1d92d7d7c5377e22` ON `user` (`email`)');
        await queryRunner.query('CREATE UNIQUE INDEX `UQ_cace4a159ff9f2512dd42373760` ON `user` (`id`)');
    }

}
