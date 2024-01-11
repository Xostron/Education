const bcrypt = require('bcrypt')
const ApiError = require('@exceptions/api-error')
const EmployeeDTO = require('../employee-dto')
const { pwd, user } = require('@tool/auth')
const { findOne } = require('@tool/db')
const { generate, save } = require('@service/token-service')
/**
 * Авторизация пользователя по логину и паролю
 * @param {*} db БД
 * @returns
 */
function login(db) {
	return function (req, res, next) {
		const { login, password, token } = req.body
		let doc
		let tokens
		// поиск пользователя
		findOne(db, 'client', { login })
			.then((r) => {
				// Пользователь не найден
				if (!r) throw new Error('err-10')
				// проверка пароля
				doc = r
				return bcrypt.compare(password, doc.password)
			})
			.then((ok) => {
				// пароли не совпадают
				if (!ok) throw new Error('err-12')

				// пароли совпадают - формирование нового токена
				empDTO = new EmployeeDTO(doc)
				tokens = generate({ ...empDTO })

				// Создание/обновление refresh токена в ДБ
				save(db, doc._id, tokens.refreshToken)

				// Добавляем рефреш токен в куки
				res.cookie('refreshToken', tokens.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000, //30 дней
					httpOnly: true,
				})
				return Promise.resolve(true)
			})
			.then((r) => {
				// console.log('@@@ Login = ', tokens, empDTO)
				res.json({ ...tokens, user: empDTO })
			})
			.catch((err) => {
				console.log('err', err)
				if (err.message) return res.status(400).send(err.toString())
				return next(ApiError.BadRequest(err))
			})
	}
}

module.exports = login
