import { Router } from "express";
import { CreatePayrollController } from "../../../../modules/payrolls/useCases/createPayroll/CreatePayrollController";
import { DeletePayrollController } from "../../../../modules/payrolls/useCases/deletePayroll/DeletePayrollController";
import { InputPayrollController } from "../../../../modules/payrolls/useCases/inputPayroll/InputPayrollController";
import { ListPayrollController } from "../../../../modules/payrolls/useCases/listPayroll/ListPayrollController";
import { OutputPayrollController } from "../../../../modules/payrolls/useCases/ListOutputPayroll/OutputPayrollController";
import { SinglePayrollController } from "../../../../modules/payrolls/useCases/singlePayroll/SinglePayrollController";
import exceljs from "exceljs"
import { ExportExcelPayrollController } from "../../../../modules/payrolls/useCases/exportExcelPayroll/ExportExcelPayrollController";
import { ListInputPayrollController } from "../../../../modules/payrolls/useCases/ListInputPayroll/ListInputPayrollController";

const payrollRouter = Router();
const createPayrollController = new CreatePayrollController();
const listInputPayrollController = new ListInputPayrollController()
const outputPayrollController = new OutputPayrollController();
const inputPayrollController = new InputPayrollController();
const singlePayrollController = new SinglePayrollController()
const deletePayrollController = new DeletePayrollController()
const exportExcelPayrollController = new ExportExcelPayrollController()

payrollRouter.post("/", createPayrollController.handle);
payrollRouter.get("/", outputPayrollController.handle);
payrollRouter.get("/input", listInputPayrollController.handle);
payrollRouter.get("/:id", singlePayrollController.handle);
payrollRouter.put("/:id", inputPayrollController.handle);
payrollRouter.delete("/", deletePayrollController.handle)
payrollRouter.get("/excel/export2", exportExcelPayrollController.handle)

payrollRouter.get("/excel/export", (request, response) => {
  try {
    let workbook = new exceljs.Workbook();

    const sheet = workbook.addWorksheet("books");

    sheet.columns = [
      {header: "ID", key: "id", width: 5,},
      {header: "Nome", key: "name", width: 25},
      {header: "Email", key: "email", width: 40},
      {header: "Genero", key: "gender", width: 25},
      {header: "Endereco Ip", key: "ip_address", width: 25}
    ]

    mock.map((value, idx) => {
      sheet.addRow({
        id: value.id,
        name: value.name,
        email: value.email,
        gender: value.gender,
        ip_address: value.ip_address
      });
    });

    sheet.getRow(1).font = {
      bold: true,
    }
    response.setHeader(
      "content-type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

    response.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "exceljsExport.xlsx"
    )
    workbook.xlsx.write(response)
  } catch {

  }
})


export { payrollRouter };

const mock = [{
  "id": 1,
  "name": "Adore",
  "email": "askurray0@admin.ch",
  "gender": "Female",
  "ip_address": "200.121.101.84"
}, {
  "id": 2,
  "name": "Gilbertina",
  "email": "golynn1@booking.com",
  "gender": "Female",
  "ip_address": "115.226.29.172"
}, {
  "id": 3,
  "name": "Felic",
  "email": "fkassel2@i2i.jp",
  "gender": "Male",
  "ip_address": "59.192.150.153"
}, {
  "id": 4,
  "name": "Joe",
  "email": "jmatasov3@hp.com",
  "gender": "Male",
  "ip_address": "212.217.132.210"
}, {
  "id": 5,
  "name": "Georgeta",
  "email": "gcogswell4@surveymonkey.com",
  "gender": "Female",
  "ip_address": "36.152.240.40"
}, {
  "id": 6,
  "name": "Fidela",
  "email": "frichardin5@cdc.gov",
  "gender": "Female",
  "ip_address": "147.131.214.218"
}, {
  "id": 7,
  "name": "Augie",
  "email": "ajumont6@mlb.com",
  "gender": "Male",
  "ip_address": "239.183.236.225"
}, {
  "id": 8,
  "name": "Perceval",
  "email": "pblencoe7@gravatar.com",
  "gender": "Male",
  "ip_address": "159.175.52.135"
}, {
  "id": 9,
  "name": "Tana",
  "email": "trainger8@goo.ne.jp",
  "gender": "Female",
  "ip_address": "46.247.114.190"
}, {
  "id": 10,
  "name": "Lexy",
  "email": "ljoselevitch9@google.com.br",
  "gender": "Female",
  "ip_address": "80.73.32.112"
}, {
  "id": 11,
  "name": "Tam",
  "email": "tsnewina@spotify.com",
  "gender": "Male",
  "ip_address": "235.41.244.81"
}, {
  "id": 12,
  "name": "Foss",
  "email": "fvasyutinb@vkontakte.ru",
  "gender": "Male",
  "ip_address": "71.140.135.8"
}, {
  "id": 13,
  "name": "Colby",
  "email": "candreouc@godaddy.com",
  "gender": "Male",
  "ip_address": "169.14.196.18"
}, {
  "id": 14,
  "name": "Kellia",
  "email": "kpratleyd@gov.uk",
  "gender": "Genderfluid",
  "ip_address": "155.201.18.92"
}, {
  "id": 15,
  "name": "Onfre",
  "email": "omasurele@google.fr",
  "gender": "Male",
  "ip_address": "142.195.159.211"
}, {
  "id": 16,
  "name": "Margareta",
  "email": "mborgnolf@tiny.cc",
  "gender": "Female",
  "ip_address": "98.69.136.20"
}, {
  "id": 17,
  "name": "Lolita",
  "email": "lmeneelyg@archive.org",
  "gender": "Female",
  "ip_address": "141.67.144.119"
}, {
  "id": 18,
  "name": "Ellsworth",
  "email": "edagonh@wp.com",
  "gender": "Bigender",
  "ip_address": "1.105.164.253"
}, {
  "id": 19,
  "name": "Bertrand",
  "email": "bfinchami@independent.co.uk",
  "gender": "Male",
  "ip_address": "93.230.113.6"
}, {
  "id": 20,
  "name": "Nowell",
  "email": "ngoodluckj@biglobe.ne.jp",
  "gender": "Male",
  "ip_address": "23.254.75.72"
}]