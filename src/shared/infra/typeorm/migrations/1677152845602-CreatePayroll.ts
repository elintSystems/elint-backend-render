import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePayroll1677152845602 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payrolls',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'employee_uid',
            type: 'uuid', 
            isNullable: true
          },
          {
            name: 'employee_name',
            type: 'varchar', 
          },
          {
            name: "dependents",
            type: "int",
          },
          {
            name: "year",
            type: "int",
          },
          {
            name: "month",
            type: "varchar",
          },
          {
            name: "position_name",
            type: "varchar",
          },
          {
            name: "departament_name",
            type: "varchar",
          },
          {
            name: "nib",
            type: "bigint",
          },
          {
            name: "social_security",
            type: "bigint"
          },
          {
            name: "nuit",
            type: "bigint"
          },
          {
            name: "salary_base",
            type: "double precision",
          },
          {
            name: "total_income",
            type: "double precision",
          },
          {
            name: "salary_liquid",
            type: "double precision",
          },
          {
            name: "overtime50",
            type: "int",
          },
          {
            name: "overtime100",
            type: "int",
          },
          {
            name: "total_overtime",
            type: "double precision",
          },
          {
            name: "month_total_workdays",
            type: "int",
          },
          {
            name: "day_total_workhours",
            type: "int",
          },
          {
            name: "base_day",
            type: "double precision",
          },
          {
            name: "base_hour",
            type: "double precision",
          },
          {
            name: "absences",
            type: "int",
          },
          {
            name: "total_absences",
            type: "double precision",
          },
          {
            name: "cash_advances",
            type: "double precision",
          },
          {
            name: "backpay",
            type: "double precision",
          },
          {
            name: "subsidy",
            type: "double precision",
          },
          {
            name: "bonus",
            type: "double precision",
          },
          {
            name: "irps",
            type: "double precision",
          },          
          {
            name: "inss_employee",
            type: "double precision",
          },
          {
            name: "inss_company",
            type: "double precision",
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
        foreignKeys: [
          {
            name: 'PayrollEmployee',
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['employee_uid'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payrolls')
  }

}

