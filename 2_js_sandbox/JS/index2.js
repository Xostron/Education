// Рекурсия, промисы - каскадное удаление
function remove(db, name, query, struct) {
	return new Promise((resolve, reject) => {
		let fObj;
		qDicts(db, name, query, struct)
			.then((f) => {
				fObj = f;
				console.log('@f =', fObj);
				if (!f.length) {
					return resolve('end branch');
				}
				const p = fObj.map((el) => qRemove(db, name, { _id: ObjectId(el._id) }));
				return Promise.all(p)
			})
			.then((_) => {
				console.log('new remove')
				const p = fObj.map((el) => remove(db, name, { parent: ObjectId(el._id) }, struct));
				return Promise.all(p);
			})
			.then((p) => {
				console.log('@ all =', p);
				resolve(p);
			})
			.catch(reject);
	});
}

function qDicts(db, name, q, struct = {}) {
	return new Promise((resolve, reject) => {
		db[name].find(q, struct, (err, docs) => {
			if (err) reject(err);
			resolve(docs);
		});
	});
}

function qRemove(db, name, q) {
	return new Promise((resolve, reject) => {
		db[name].remove(q, (error, obj) => {
			if (error) return reject(error);
			resolve(true);
		});
	});
}