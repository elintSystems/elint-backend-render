import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSettings1678524971766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'settings',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'company_name',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'company_telephone',
              type: 'int',
              isNullable: true,
            },
            {
              name: "company_contact",
              type: "int",
              isNullable: true,
            },
            {
              name: "company_email",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "company_website",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "company_fax",
              type: "int",
              isNullable: true,
            },
            {
              name: "company_address",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "company_province",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "company_city",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "postal_code",
              type: "int",
              isNullable: true,
            },
            {
              name: "company_country",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "company_avatar",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "payroll_total_workdays_month",
              type: "int",
              isNullable: true,
            },
            {
              name: "payroll_total_workhours_day",
              type: "int",
              isNullable: true,
            },
            {
              name: "overtime",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "absences",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "cash_advances",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "backpay",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "bonus",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "subsidy",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "flag_id",
              type: "int",
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
      await queryRunner.dropTable('settings')
    }

}
