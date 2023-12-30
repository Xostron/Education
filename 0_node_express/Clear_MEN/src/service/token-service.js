const jwt = require('jsonwebtoken');

// Генерируем новый токен
function generate(payload) {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: process.env.ACCESSS_EXPIRE,
	});
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.REFRESH_EXPIRE,
	});
	return {
		accessToken,
		refreshToken,
	};
}

// Сохраняем токен сотрудника в БД
function save(db, userId, refresh, oldrefresh) {
	const o = {
		userId,
		refresh,
		update: new Date(),
	};
	db.token.update(
		{ userId, refresh: oldrefresh },
		{ $set: o },
		{ upsert: true },
		(err) => {
			if (err) console.error(err);
		}
	);
}

// Удаление токена из бд
function remove(db, refresh = null) {
	return new Promise((resolve, reject) => {
		if (!refresh) return resolve(true);
		// Удаление токена из бд
		db.token.remove({ refresh }, (err, doc) => {
			if (err) return reject(err);
			// Если ничего не нашли
			if (!doc.ok) throw new Error('15');
			resolve(doc);
		});
	});
}

// Валидация акцесс токена
function validateAccess(token) {
	try {
		const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		return data;
	} catch (error) {
		return null;
	}
}

// Валидация рефреш токена
function validateRefresh(token) {
	try {
		const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		return data;
	} catch (error) {
		return null;
	}
}

// Поиск токена в БД
function findRefresh(db, token) {
	return new Promise((resolve, reject) => {
		if (!token) resolve(null);
		db.token.findOne({ refresh: token }, (err, doc) =>
			err ? reject(err) : resolve(doc)
		);
	});
}

module.exports = {
	generate,
	save,
	remove,
	validateAccess,
	validateRefresh,
	findRefresh,
};
