const uuid4 = require('uuid4');
const { imgPath } = require('@store');
const { getConf, convert, saveDB } = require('./fn');

// Сохранение Изображения
function save(db, obj, info) {
	return new Promise((resolve, reject) => {
		const { key, code, file, img, id } = obj;
		const company = info.company.code;
		const name = uuid4();
		const full_name = name + '.' + img?.type;
		const arr = getConf(code, key);
		if (!arr) {
			file.mv(imgPath(company, full_name))
				.then((_) => {
					const obj = {
						name: full_name,
						fld: {
							name: key,
							type: '',
						},
						owner: {
							type: code,
							id,
						},
					};
					return saveDB(db, obj);
				})
				.then(resolve)
				.catch(reject);
			return;
		}

		const p = arr.map((el) => convert(file, company, name, el));

		Promise.all(p)
			.then((r) => {
				const p = r.map((el) => {
					const obj = {
						name: el.name,
						fld: {
							name: key,
							type: el.type,
						},
						owner: {
							type: code,
							id,
						},
					};
					return saveDB(db, obj);
				});
				return Promise.all(p);
			})
			.then(resolve)
			.catch(reject);
	});
}

module.exports = save;
