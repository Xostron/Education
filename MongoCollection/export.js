const path = require('path');
require('dotenv').config();
const { exec } = require('child_process');

const dir = path.join(__dirname, 'dump');
const a = [
	"company",
	"employee",
	"product",
	"category",
	"client",
	"order",
	"price",
	"status",
	"delivery",
	"polygon",
	"polList",
	"delList",
	"arrival",
	"traffic",
	"address",
	"token",
	"remainder",
	"provider",
	"unit",
	"discount",
	"bonus",
	"region",
	"city",
	"dlvTime",
	"num",
	"consumption",
	"place",
	"ordList",
	"courier",
	"rack",
	"cell",
	"role",
	"terms",
	"reward",
	"rewList",
	"arrList",
	"commodity",
	"group",
	"party",
	"box",
	"package",
	"pacStatus",
	"delStatus",
	"doc",
	"payConfig",
	"paySystem",
	"balance",
	"pickup",
	"googlePlay",
	"screen",
	"paw",
	"agent",
	"work",
	"partner",
	"parList",
	"message",
	"entity",
	"town",
	"promo",
	"check",
	"used",
	"img",
	"tariff",
	"tarList",
	"pacList",
	"tarDelivery",
	"tip",
	"tarTip",
	"balEmployee",
	"reduction",
	"payment",
	"card",
	"chosen",
	"bid",
	"bidList",
	"bidOrder",
	"kladr",
	"post",
	"push",
	"property",
	"item",
	"detail",
	"combination",
	"comList",
	"fabric",
	"promotion",
	"proList",
	"proCategory",
	"proProduct",
	"review",
	"cliInfo",
	"favorite",
	"icDict",
	"icSale",
	"calendar",
	"additive",
	"proAdditive",
	"task",
	"celList",
	"comInvoice",
  ];
a.forEach(file);

// Очередной файл
function file(name) {
	const fl = path.join(dir, name + '.json');
	const com = `mongoexport --sort "{_id: 1}" --pretty -d ${process.env.BD} -c ${name} -o ${fl}`;
	console.log(com);
	exec(com, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
}
