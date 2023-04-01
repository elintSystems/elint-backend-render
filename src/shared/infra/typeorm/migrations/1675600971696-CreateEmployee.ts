import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEmployee1675600971696 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'employee_id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'dependents',
            type: 'int',
          },
          {
            name: "salary",
            type: "double precision",
          },
          {
            name: "birth_date",
            type: "Date",
          },
          {
            name: "place_birth",
            type: "varchar",
          },
          {
            name: "nationality",
            type: "varchar",
          },
          {
            name: "bi",
            type: "varchar",
          },
          {
            name: "marital_status",
            type: "varchar",
          },
          {
            name: "gender",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "contact",
            type: "int",
          },
          {
            name: "contact2",
            type: "int",
            isNullable: true
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "nuit",
            type: "bigint",
          },
          {
            name: "vacation",
            type: "int",
            isNullable: true
          },
          {
            name: "subsidy",
            type: "double precision",
          },
          {
            name: "department",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "position",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "start_date",
            type: "date",
          },
          {
            name: "end_date",
            type: "date",
            isNullable: true,
          },
          {
            name: "employee_status",
            type: "varchar",
          },
          {
            name: "bank_name",
            type: "varchar",
          },
          {
            name: "bank_account",
            type: "bigint",
          },
          {
            name: "nib",
            type: "bigint",
          },
          {
            name: "social_security",
            type: "bigint",
          },
          {
            name: 'created_at',
            type: "timestamp",
            default: "now()"
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees')
  }

}
