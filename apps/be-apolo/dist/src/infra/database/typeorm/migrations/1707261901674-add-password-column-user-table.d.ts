import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddPasswordColumnUserTable1707261901674 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
