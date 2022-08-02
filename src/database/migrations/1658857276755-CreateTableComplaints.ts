import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableComplaints1658857276755 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "complaints",
        columns:[
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "user_id",
            type: "uuid"
          },
          {
            name: "title",
            type: "varchar"
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: "status",
            type: "varchar"
          },
          {
            name: "address",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ],
        foreignKeys: [
          {
            name: "FKUserComplaints",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("complaints")
  }

}
