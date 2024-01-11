// const { dict } = require('@root/tool/dict');
// const { tariff } = require('@tool/market/tariff');
const fs = require('fs');
const path = require('path');

/**
 * Доп данные пользователя/сотрудника
 * @param {Object} db БД
 * @param {Object} user Данные пользователя/сотрудника из токена
 * @returns 
 */
function infU(db, user) {
	return new Promise((resolve, reject) => {
		if (!user.auth && !user.id) return resolve(null);
		// Информация о клиентах
		if (user.type == 'client') {
			dict(db, 'cliInfo', user.id, 'clientId')
				.then((r) => resolve({ cliInfo: r, cliInfoId: r?._id }))
				.catch(reject);
			return;
		}

		// Информация о сотрудниках
		dict(db, 'employee', user.id, '_id')
			.then((r) => {
				if (!r) return resolve(null);
				const o = {
					line: r.line ?? {
						form: +process.env.L_FORM,
						table: +process.env.L_TABLE,
					},
					short: r.short ?? false,
				};
				resolve({ cliInfo: r, cliInfoId: r?._id });
			})
			.catch(reject);
	});
}

//
// function emp(db, user) {
// 	return new Promise((resolve, reject) => {
// 		db.employee.findOne({ _id: user.id }, (err, doc) => {
// 			if (err) return reject(err);
// 			if (!doc) return resolve(null);
// 			const l_def = {
// 				form: +process.env.L_FORM,
// 				table: +process.env.L_TABLE,
// 			};
// 			const o = {
// 				line: doc.line ?? l_def,
// 				short: doc.short ?? false,
// 			};
// 			return resolve(o);
// 		});
// 	});
// }

/**
 * Получение данных для маркета
 * @param {Object} db БД
 * @param {Object} q Запрос
 * @param {Boolean} short Доп данные
 * @returns
 */
// function infM(db, q, short = false) {
// 	return new Promise((resolve, reject) => {
// 		let result;
// 		getOne(db, 'market', q)
// 			.then((r) => {
// 				if (!r) return resolve({});
// 				result = {
// 					id: r._id,
// 					code: r.code,
// 					name: r.name,
// 				};
// 				if (short) return Promise.resolve();
// 				// Получение доп. данных
// 				const a = [tariff(db, r._id)];

// 				return Promise.all(a);
// 			})
// 			.then((r) => {
// 				if (r) result.tariff = r[0];
// 				resolve(result);
// 			})
// 			.catch(reject);
// 	});
// }

// Дополнение info данными компании
// function infC(db, q, short = false) {
// 	return new Promise((resolve, reject) => {
// 		let c;
// 		getOne(db, 'company', q)
// 			.then((r) => {
// 				if (!r) return resolve([]);
// 				c = {
// 					id: r._id,
// 					code: r.code,
// 					name: r.name,
// 					marketId: r.marketId,
// 				};
// 				resolve(c);
// 			})
// 			.catch(reject);
// 	});
// }

// /**
//  * Поиск по запросу одной записи
//  * @param {Object} db БД
//  * @param {String} name Колекция
//  * @param {Object} q Запрос
//  * @returns
//  */
// function getOne(db, name, q) {
// 	return new Promise((resolve, reject) => {
// 		db[name].findOne(q, (err, doc) => {
// 			if (err) return reject(err);
// 			resolve(doc);
// 		});
// 	});
// }

/**
 * Чтение файла при первом обращении или изменении
 */
const getV = ((_) => {
	let data = null;
	let time = null;
	return (_) => {
		const file = path.join(__dirname, '..', '..', 'version.json');
		const t = fs.statSync(file).mtime.toString();
		if (data && t == time) return data;

		data = fs.readFileSync(file, 'utf8');
		data = JSON.parse(data) ?? [];
		time = t;
		return data;
	};
})();

// module.exports = { infU, infM, infC, getV };
module.exports = { getV, infU };
