const rows = [
	{ _id: 1 },
	{ _id: 2 },
	{ _id: 3 },
	{ _id: 4 },
	{ _id: 5 },
	{ _id: 6 },
	{ _id: 7 },
	{ _id: 8 },
	{ _id: 9 },
	{ _id: 10 },
	{ _id: 11 },
	{ _id: 12 },
	{ _id: 13 },
	{ _id: 14 },
	{ _id: 15 },
];

main();

// Главный заказчик
function main() {
	console.log("1 Начало работы main", rows);
	submain(rows)
		.then((result) => {
			console.log("7-Конец: результат Submain = ", result);
		})
		.catch(console.log);
}

// исполнитель итератора
function submain(rows) {
	return new Promise((resolve, reject) => {
		console.log("2 Начало работы submain");
		queue(rows)
			.then((_) => {
				console.log("6 результат queue = ", rows);
				resolve(rows);
			})
			.catch(reject);
	});
}

// итератор выполнения комплектов промисов
async function queue(rows) {
	try {
		console.log("3 Начало работы queue");
		const parent = rows.slice();
		const count = 10;

		for (let i = 0; i < Math.ceil(rows.length / count); i++) {
			const child =
				parent.length > count
					? parent.slice(0, count)
					: parent.slice(0, parent.length);
			parent.splice(0, count);
			const p = child.map((el) => t(el._id));
			const r = await Promise.all(p);
			rows.forEach((el) => {
				r.forEach((ch) => {
					if (ch.idx === el._id) el.err = ch.msg;
				});
			});
		}
	} catch (error) {
		throw new Error(error);
	}
}

// исполняемый промис
function t(idx) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`4. Timer ${idx} start`);
			resolve({ idx: idx, msg: `Timer ${idx} start` });
		}, 1000);
	});
}

