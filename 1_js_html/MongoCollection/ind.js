const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

function indexes() {
	const url = 'mongodb://127.0.0.1:27017/';
	const mongo = new MongoClient(url);
	const obj = getObj();
	mongo.connect((err, client) => {
		if (err) {
			console.log('MongoDB не доступно');
			return;
		}
		console.log('Подключение к MongoDB установлено');
		const db = client.db(process.env.BD);
		list(db)
			.then((a) => {
				const p = [];
				for (let key in obj) {
					const i = a.findIndex((el) => key === el);
					if (i < 0) p.push(db.createCollection(key));
				}
				return Promise.all(p);
			})
			.then((_) => {
				const p = [];
				for (let key in obj) {
					const drop = db.collection(key).dropIndexes();
					p.push(drop);
				}
				return Promise.all(p);
			})
			.then((_) => {
				const p = [];
				for (let key in obj) {
					obj[key].forEach((el) => {
						const fld = el.name;
						const index = db
							.collection(key)
							.createIndex(
								{ [fld]: 1 },
								{ unique: el.unique ?? false }
							);
						p.push(index);
					});
				}
				return Promise.all(p);
			})
			.then((_) => {
				console.log('Индексы добавлены успешно');
				client.close();
			})
			.catch((err) => {
				console.log('error', err);
				client.close();
			});
	});
}

function list(db) {
	return new Promise((resolve, reject) => {
		const a = [];
		db.collections((e, cols) => {
			if (e) return reject(e);
			cols.forEach((col) => {
				a.push(col.collectionName);
			});
			resolve(a);
		});
	});
}

//Функция получения обекта индексируемых полей
function getObj() {
	return {
		box: [{ name: 'arrListId' }],
		token: [{ name: 'userId' }],
		entity: [{ name: 'clientId' }],
		address: [{ name: 'clientId' }],
		region: [{ name: 'companyId' }],
		reduction: [{ name: 'companyId' }],
		unit: [{ name: 'name' }, { name: 'code' }],
		check: [{ name: 'code' }, { name: 'orderId' }],
		city: [{ name: 'regionId' }, { name: 'type' }],
		rack: [{ name: 'companyId' }, { name: 'num' }],
		place: [{ name: 'qr' }, { name: 'companyId' }],
		role: [{ name: 'code' }, { name: 'employeeId' }],
		price: [{ name: 'date' }, { name: 'productId' }],
		tarTip: [{ name: 'date' }, { name: 'companyId' }],
		dlvTime: [{ name: 'time' }, { name: 'companyId' }],
		bidOrder: [{ name: 'bidId' }, { name: 'orderId' }],
		bidList: [{ name: 'bidId' }, { name: 'product.id' }],
		tarDelivery: [{ name: 'date' }, { name: 'companyId' }],
		googlePlay: [{ name: 'title' }, { name: 'companyId' }],
		pacList: [{ name: 'productId' }, { name: 'packageId' }],
		work: [{ name: 'date' }, { name: 'code' }, { name: 'name' }],
		consumption: [{ name: 'owner.id' }, { name: 'trafficId' }],
		paw: [{ name: 'date' }, { name: 'code' }, { name: 'paymentId' }],
		bid: [{ name: 'num' }, { name: 'partnerId' }, { name: 'date' }],
		cell: [{ name: 'rackId' }, { name: 'orderId' }, { name: 'num' }],
		party: [{ name: 'code' }, { name: 'name' }, { name: 'companyId' }],
		package: [{ name: 'date' }, { name: 'qr' }, { name: 'arrListId' }],
		partner: [{ name: 'date' }, { name: 'companyId' }, { name: 'off' }],
		post: [{ name: 'code' }, { name: 'order' }, { name: 'companyId' }],
		terms: [{ name: 'type' }, { name: 'order' }, { name: 'companyId' }],
		message: [{ name: 'date' }, { name: 'type' }, { name: 'companyId' }],
		tip: [{ name: 'date' }, { name: 'orderId' }, { name: 'employeeId' }],
		screen: [{ name: 'img' }, { name: 'order' }, { name: 'googlePlayId' }],
		town: [{ name: 'code' }, { name: 'owner.type' }, { name: 'owner.id' }],
		discount: [{ name: 'date1' }, { name: 'date2' }, { name: 'productId' }],
		tarList: [
			{ name: 'date' },
			{ name: 'tariffId' },
			{ name: 'companyId' },
		],
		arrList: [
			{ name: 'qr' },
			{ name: 'arrivalId' },
			{ name: 'commodityId' },
		],
		delList: [
			{ name: 'deliveryId' },
			{ name: 'orderId' },
			{ name: 'order' },
		],
		courier: [
			{ name: 'employeeId', unique: true },
			{ name: 'isActivated' },
		],
		polList: [
			{ name: 'polygonId' },
			{ name: 'companyId' },
			{ name: 'order' },
		],
		card: [
			{ name: 'owner.type' },
			{ name: 'owner.id' },
			{ name: 'companyId' },
		],
		ordList: [
			{ name: 'orderId' },
			{ name: 'placeId' },
			{ name: 'employeeId' },
		],
		payConfig: [
			{ name: 'code' },
			{ name: 'paySystemId' },
			{ name: 'companyId' },
		],
		reward: [
			{ name: 'code' },
			{ name: 'name' },
			{ name: 'qr' },
			{ name: 'groupId' },
		],
		doc: [
			{ name: 'date' },
			{ name: 'name' },
			{ name: 'type' },
			{ name: 'companyId' },
		],
		num: [
			{ name: 'year' },
			{ name: 'type' },
			{ name: 'guid' },
			{ name: 'companyId' },
		],
		commodity: [
			{ name: 'code' },
			{ name: 'name' },
			{ name: 'qr' },
			{ name: 'groupId' },
		],
		img: [
			{ name: 'name' },
			{ name: 'order' },
			{ name: 'owner.id' },
			{ name: 'owner.type' },
		],
		used: [
			{ name: 'date' },
			{ name: 'clientId' },
			{ name: 'promoId' },
			{ name: 'orderId' },
		],
		fabric: [
			{ name: 'trafficId' },
			{ name: 'employeeId' },
			{ name: 'date1' },
			{ name: 'date2' },
		],
		review: [
			{ name: 'date' },
			{ name: 'rating' },
			{ name: 'productId' },
			{ name: 'clientId' },
		],
		bonus: [
			{ name: 'date' },
			{ name: 'orderId' },
			{ name: 'clientId' },
			{ name: 'companyId' },
		],
		chosen: [
			{ name: 'date' },
			{ name: 'productId' },
			{ name: 'clientId' },
			{ name: 'companyId' },
		],
		pacStatus: [
			{ name: 'date' },
			{ name: 'code' },
			{ name: 'packageId' },
			{ name: 'employeeId' },
		],
		delStatus: [
			{ name: 'date' },
			{ name: 'code' },
			{ name: 'employeeId' },
			{ name: 'deliveryId' },
		],
		client: [
			{ name: 'date' },
			{ name: 'born' },
			{ name: 'phone', unique: true },
			{ name: 'email' },
		], // убрать лишние
		balEmployee: [
			{ name: 'date' },
			{ name: 'type' },
			{ name: 'deliveryId' },
			{ name: 'employeeId' },
		],
		parList: [
			{ name: 'order' },
			{ name: 'productId' },
			{ name: 'categoryId' },
			{ name: 'partnerId' },
			{ name: 'off' },
		],
		payment: [
			{ name: 'type' },
			{ name: 'owner.type' },
			{ name: 'owner.id' },
			{ name: 'payConfigId' },
		],
		category: [
			{ name: 'companyId' },
			{ name: 'img' },
			{ name: 'parent' },
			{ name: 'order' },
			{ name: 'off' },
		],
		rewList: [
			{ name: 'date1' },
			{ name: 'date2' },
			{ name: 'order' },
			{ name: 'rewardId' },
			{ name: 'companyId' },
		],
		arrival: [
			{ name: 'date' },
			{ name: 'qr' },
			{ name: 'closed' },
			{ name: 'companyId' },
			{ name: 'providerId' },
		],
		employee: [
			{ name: 'companyId' },
			{ name: 'login', unique: true },
			{ name: 'date' },
			{ name: 'isActivated' },
		],
		balance: [
			{ name: 'date' },
			{ name: 'type' },
			{ name: 'owner.type' },
			{ name: 'owner.id' },
			{ name: 'companyId' },
		],
		status: [
			{ name: 'employeeId' },
			{ name: 'orderId' },
			{ name: 'date' },
			{ name: 'companyId' },
			{ name: 'code' },
		],
		traffic: [
			{ name: 'date' },
			{ name: 'closed' },
			{ name: 'productId' },
			{ name: 'partnerId' },
			{ name: 'orderId' },
		],
		remainder: [
			{ name: 'date' },
			{ name: 'closed' },
			{ name: 'productId' },
			{ name: 'owner.id' },
			{ name: 'owner.type' },
		],
		provider: [
			{ name: 'inn' },
			{ name: 'kpp' },
			{ name: 'ogrn' },
			{ name: 'phone' },
			{ name: 'email' },
			{ name: 'partyId' },
		],
		tariff: [
			{ name: 'name' },
			{ name: 'subscriptions' },
			{ name: 'write' },
			{ name: 'sms' },
			{ name: 'month' },
			{ name: 'off' },
		],
		delivery: [
			{ name: 'employeeId' },
			{ name: 'date' },
			{ name: 'num' },
			{ name: 'create' },
			{ name: 'closed' },
		],
		pickup: [
			{ name: 'geo.type' },
			{ name: 'geo.coordinates' },
			{ name: 'time.beg' },
			{ name: 'time.end' },
			{ name: 'schedule' },
			{ name: 'companyId' },
		],
		company: [
			{ name: 'code', unique: true },
			{ name: 'date' },
			{ name: 'delivery.type.courier' },
			{ name: 'delivery.type.picker' },
			{ name: 'delivery.type.post' },
		],
		agent: [
			{ name: 'date' },
			{ name: 'code' },
			{ name: 'name.first' },
			{ name: 'name.last' },
			{ name: 'name.middle' },
			{ name: 'phone' },
			{ name: 'closed' },
		],
		promo: [
			{ name: 'date1' },
			{ name: 'date2' },
			{ name: 'price' },
			{ name: 'one' },
			{ name: 'new' },
			{ name: 'min' },
			{ name: 'agentId' },
			{ name: 'companyId' },
			{ name: 'closed' },
		],
		order: [
			{ name: 'companyId' },
			{ name: 'clientId' },
			{ name: 'owner.id' },
			{ name: 'date' },
			{ name: 'delivery.date' },
			{ name: 'closed' },
			{ name: 'owner.type' },
		],
		product: [
			{ name: 'name' },
			{ name: 'unit' },
			{ name: 'mfr' },
			{ name: 'order' },
			{ name: 'ready.type' },
			{ name: 'ready.day' },
			{ name: 'categoryId' },
			{ name: 'on' },
			{ name: 'off' },
		],
		cliInfo: [
			{ name: 'date' },
			{ name: 'name' },
			{ name: 'born' },
			{ name: 'email' },
			{ name: 'clientId' },
			{ name: 'companyId' },
		],
		icDict: [
			{ name: 'name' },
			{ name: 'entity' },
			{ name: 'code' },
			{ name: 'companyId' },
		],
		icSale: [
			{ name: 'date' },
			{ name: 'code' },
			{ name: 'closed' },
			{ name: 'commodityId' },
		],
		combination: [{ name: 'productId' }, { name: 'exclude.on' }],
		comList: [{ name: 'itemId' }, { name: 'combinationId' }],
		property: [{ name: 'name' }, { name: 'type' }, { name: 'productId' }],
		item: [{ name: 'name' }, { name: 'propertyId' }],
	};
}

module.exports = indexes;
