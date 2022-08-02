import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableFiles1658864268815 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "files",
        columns:[ 
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "complaints_id",
            type: "uuid"
          },
          {
            name: "url",
            type: "varchar"
          },
          {
            name: "key",
            type: "varchar"
          }
        ],
        foreignKeys: [
          {
            name: "FKComplaintsFiles",
            referencedTableName: "complaints",
            referencedColumnNames: ["id"],
            columnNames: ["complaints_id"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("files");
  }

}
