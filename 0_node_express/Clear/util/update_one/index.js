const mongojs = require("mongojs");
const { ObjectId } = require("mongojs");

const db = mongojs("127.0.0.1:27017/play");
db.on("error", (err) => console.log("Отсутствует связь с MongoDB"));
db.on("connect", () => console.log("Связь с MongoDB установлена"));

const marketId = ObjectId("64d0ae0636863e4b30049823");

const rows = [
	{
		_id: ObjectId("65080db7d6e1e93d5c721b37"),
		name: "Одежда+",
		marketId,
		order: 2,
		update: new Date(),
	},
	{
		name: "Для женщин",
		marketId,
		parent: ObjectId("65080db7d6e1e93d5c721b37"),
		order: 1,
		update: new Date(),
	},
	{
		name: "Для мужчин",
		marketId,
		parent: ObjectId("65080db7d6e1e93d5c721b37"),
		order: 1,
		update: new Date(),
	},
];

main(db)
	.then((r) => {
		console.log(r);
	})
	.catch(console.log)
	.finally((_) => db.close());

function main(db) {
	return new Promise((resolve, reject) => {
		updateOne(db, rows[0], 10)
			.then((r1) => {
				console.log("1 update = ", r1);
				return updateOne(db, rows[1], 11);
			})
			.then((r2) => {
				console.log("2 update = ", r2);
				return updateOne(db, rows[2], 12);
			})
			.then((r3) => {
				console.log("3 update = ", r3);
				resolve("Загружено!");
			})
			.catch(reject);
	});
}

function updateOne(db, el, idx) {
	return new Promise((resolve, reject) => {
		const q =
			typeof el?._id === "object"
				? { _id: el._id }
				: { _id: new ObjectId() };
		const props = { upsert: true };
		db.category.updateOne(q, { $set: el }, props, (err, doc) => {
			if (err) reject(err);
			resolve({ ...doc?.upserted?.[0], idx });
		});
	});
}


