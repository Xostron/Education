const bcrypt = require('bcrypt')
const ApiError = require('@exceptions/api-error')
const { pwd, user } = require('@tool/auth')
const { findOne } = require('@tool/db')
/**
 * Авторизация пользователя по логину и паролю
 * @param {*} db БД
 * @returns
 */
function login(db) {
	return function (req, res, next) {
		const { login, password, token } = req.body
		console.log(login)
		// проверка пользователя
		findOne(db, 'client', { login })
			.then((r) => {
				console.log(r)
				if (!r) throw new Error('err-10')
				const data = { r }
				res.json({ result: data })
			})
			.catch((err) => {
				console.log('err', err)
				if (err.message) return res.status(400).send(err.toString())
				return next(ApiError.BadRequest(err))
			})
	}
}

module.exports = login
