const bcrypt = require('bcrypt')

/**
 * Хэширование пароля
 * @param {*} password
 * @returns
 */
function pwd(password) {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 3, (err, hash) => {
			if (!hash) return reject(err ?? 'Обратитесь к администратору!')
			resolve(hash)
		})
	})
}

/**
 * Проверка уникальности логина
 * @param {*} db
 * @param {*} login
 * @returns
 */
function user(db, login) {
	return new Promise((resolve, reject) => {
		db.client.findOne({ login }, (err, doc) => {
			if (err) return reject(err)
			if (doc) return resolve('Пользователь с таким именем уже существует!')
			// Такого пользователя нет
			resolve(false)
		})
	})
}

module.exports = { pwd, user }
