const ApiError = require('@exceptions/api-error')
const { pwd } = require('../fn')
const { user, create } = require('./fn')

// Регистрация нового пользователя
function signup(db) {
	return function (req, res, next) {
		try {
			const { login, password1, password2 } = req.body
			console.log('1@@@ SIGNUP ', login, password1, password2)
			// проверка пароля
			if (password1 !== password2) return next(ApiError.BadRequest('Пароли должны совпадать'))

			const p = [pwd(password1), user(db, login)]
			Promise.all(p)
				.then(([hash, check, crt]) => {
					console.log('@2 = ', hash, ' - ', check, ' = ', crt)
				})
				.catch()
			res.json({ result: 'signup' })
		} catch (error) {
			next(ApiError.BadRequest(error.toString()))
		}
	}
}

module.exports = signup
