const ApiError = require('@exceptions/api-error')
const { pwd, user } = require('@tool/auth')
const { insert } = require('@tool/db')

/**
 * Регистрация
 * @param {*} db БД
 * @returns
 */
function signup(db) {
	return function (req, res, next) {
		const { password1, password2, login } = req.body
		const now = new Date()
		console.log('1 web signup = ', login, password1, password2)
		// Пароли не совпадают
		if (password1 !== password2) {
            // throw new Error('err-10')
			return next(ApiError.BadRequest('Пароли должны совпадать'))
		}

		// Проверки и хэширование
		const p = [pwd(password1), user(db, login)]
		Promise.all(p)
			.then(([pwd, exist]) => {
				// Такой пользователь уже существует
				const m = [exist]
				if (exist) return Promise.reject({ message: m })

				// Создаем пользователя
				const data = {
					login,
					password: pwd,
					date: now,
					update: now,
				}
				return insert(db, 'client', data)
			})
			.then((_) => res.send({ result: 'web signup ' + login }))
			.catch((err) => {
				console.log('err', err)
				if (err.message) return res.status(400).send(err.toString())
				return next(ApiError.BadRequest(err))
			})
	}
}
module.exports = signup
